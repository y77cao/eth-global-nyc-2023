"use client";
import {
  useActiveProfile,
  useCreatePost,
  useCreateEncryptedPost,
  ContentFocus,
  ProfileOwnedByMe,
  useProfilesOwnedByMe,
} from "@lens-protocol/react-web";

import { WebBundlr } from "@bundlr-network/client";
import { ethers } from "ethers";

export default function Search() {
  const { data: publisher } = useActiveProfile();

  /**
   * Creates a new Bundlr object that will then be used by other
   * utility functions. This is where you set your node address and currency.
   *
   * @returns A reference to a Bundlr object
   */
  const getBundlr = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const bundlr = new WebBundlr(
      "https://devnet.bundlr.network",
      "matic",
      provider
    );
    await bundlr.ready();
    return bundlr;
  };

  /**
   * Funds a Bundlr node the specified amount.
   * Note: The currency (token) used is the currency specified when
   * creating the Bundlr object in the file `get-bundlr.js`.
   *
   * @param {*} fundAmount About to fund, value in standard units. Value will automatically
   * be coverted to atomic units.
   * @returns "Node funded" if successful or an error message.
   */
  const fundNode = async (fundAmount) => {
    try {
      // get a refernce to the WebBundlr singleton
      const bundlr = await getBundlr();

      const fundAmountAtomic = bundlr.utils.toAtomic(fundAmount);
      const tx = await bundlr.fund(fundAmountAtomic);
      return "Node funded";
    } catch (e) {
      console.log("Error on fund ", e);
      return "Error on fund: " + e;
    }
    return "";
  };

  // gets the loaded balance in MATIC, not atomic units
  /**
   * Gets the balance the user has already loaded on the specified
   * Bundlr node. Balance returned is in standard MATIC units, not atomic units.
   *
   * @returns Balance loaded on the node for current user.
   */
  const getBalanceMatic = async () => {
    try {
      // get a reference to the WebBundlr singleton
      const bundlr = await getBundlr();
      const atomicBalance = await bundlr.getLoadedBalance();

      console.log(bundlr.utils.fromAtomic(atomicBalance).toString(), "amount");
      return bundlr.utils.fromAtomic(atomicBalance).toString();
    } catch (e) {
      console.log("Error on getBalanceMatic ", e);
    }
    return "";
  };

  const uploadJson = async (data: unknown): Promise<string> => {
    const serialized = JSON.stringify(data);

    const bundlr = await getBundlr();
    const { id } = await bundlr.upload(serialized);

    console.log(`https://arweave.net/${id}`);

    return Promise.resolve(`https://arweave.net/${id}`);
  };

  const {
    execute: create,
    error,
    isPending,
  } = useCreatePost({ publisher, upload: uploadJson });

  const onSubmit = async (content: string) => {
    await create({
      content,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: "en",
    });
  };

  if (!publisher) return null;

  return (
    <main className="px-10 py-14">
      <div>
        <a
          rel="no-opener"
          target="_blank"
          href={`https://share.lens.xyz/u/${publisher.handle}`}
        >
          <div className="border rounded-lg p-10">
            <div>
              {publisher.picture?.__typename === "MediaSet" && (
                <img
                  src={profile?.picture?.original?.url}
                  className="rounded w-[200px]"
                />
              )}
              {publisher.picture?.__typename === "NftImage" && (
                <img
                  src={publisher?.picture?.uri}
                  className="rounded w-[200px]"
                />
              )}
            </div>
            <div className="mt-4">
              <p className="text-primary font-medium">{publisher?.handle}</p>
            </div>
          </div>
        </a>
        <div className="mt-4">
          <button onClick={() => onSubmit("Hello world")}>Post</button>
          <button onClick={() => getBalanceMatic()}>Get balance</button>
        </div>
      </div>
    </main>
  );
}
