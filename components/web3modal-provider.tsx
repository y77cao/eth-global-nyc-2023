import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { polygon, polygonMumbai, goerli } from "wagmi/chains";

const projectId = "c8f668fb5e6e33e08278f9b699f3e292";

const chains = [goerli];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "TODO",
});

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3ModalProvider({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
