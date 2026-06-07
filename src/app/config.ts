import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My Web3 App',
  projectId: 'YOUR_PROJECT_ID', // Сюда нужно вставить ID из WalletConnect Cloud, либо временно любую строку для теста
  chains: [mainnet, sepolia],
  ssr: true, // Обязательно true для Next.js
});