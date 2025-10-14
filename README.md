# BNB SocialFi Prototype

A simple Twitter SocialFi dApp prototype for BNB Chain. Includes two Solidity contracts and a minimal React TypeScript frontend.

## Contents
- contracts/Tweets.sol
- contracts/RewardToken.sol
- frontend/ (Vite + React TypeScript app)

## Quickstart
1. Compile and deploy `RewardToken.sol` and `Tweets.sol` (e.g., Remix or Hardhat) on BNB Testnet.
2. Update `frontend/src/App.tsx` with deployed contract addresses.
3. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

## Security
This is a prototype. Do NOT use private keys in public repos. Use testnet and audit before mainnet.
