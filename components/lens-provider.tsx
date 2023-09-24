"use client";
import { goerli } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  LensProvider as Provider,
  LensConfig,
  sandbox,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: "https://eth-goerli.g.alchemy.com/v2/XTtxNP3NE-mNo33RVIyepMLmS8Z97cLX",
      }),
    }),
  ]
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: sandbox,
};

export function LensProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <Provider config={lensConfig}>{children}</Provider>
    </WagmiConfig>
  );
}
