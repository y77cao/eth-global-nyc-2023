import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20ABI } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { votingContractABI } from './src/generated'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'votingContract',
      abi: votingContractABI,
    },
  ],
  plugins: [
    react(),
  ],
})