import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { foundry } from "wagmi/chains";

const projectId = "TODO";

const chains = [foundry];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "TODO",
});

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3ModalProvider({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
