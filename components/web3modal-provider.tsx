import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
<<<<<<< HEAD
import { polygon, polygonMumbai, goerli } from "wagmi/chains";

const projectId = "c8f668fb5e6e33e08278f9b699f3e292";

const chains = [goerli];
=======
import { polygon, polygonMumbai } from "wagmi/chains";

const projectId = "c8f668fb5e6e33e08278f9b699f3e292";

const chains = [polygonMumbai, polygon];
>>>>>>> a5f872ecc830b87829d5f92c2274c01b7734548b
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "TODO",
});

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3ModalProvider({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
