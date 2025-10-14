# BNB SocialFi dApp — Twitter Socialfi with $GEM Rewards

A simple decentralized SocialFi app built on **BNB Chain**, combining social posting with tokenized rewards.
Users can post tweets, like posts, and earn **$GEM** tokens for engagement.

---

## 🌐 Overview

This project is a minimal **Twitter SocialFi** prototype built on the BNB Chain.
It allows users to:
- Post short on-chain tweets.
- Like posts and reward creators with $GEM tokens.
- Connect their wallet with MetaMask.
- View all posts in a live feed.

Total setup time: **~90 minutes** for full deployment (frontend + contracts).

---

## 🧰 Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | React + Vite + TypeScript + Ethers.js |
| **Smart Contracts** | Solidity (OpenZeppelin templates) |
| **Blockchain** | BNB Chain Testnet |
| **Wallets** | MetaMask |
| **Backend / Storage** | Moralis (for auth, IPFS uploads, off-chain storage) |

---

## 💎 Smart Contracts

### Tweets.sol
- Stores tweet data on-chain.
- Emits events for each new tweet and like.
- Uses gas-optimized mappings (no loops).
- Integrates with RewardToken for rewarding likes.

### RewardToken.sol ($GEM)
- ERC-20 token with initial supply minted to deployer.
- Used to reward users for engagement.
- Built using OpenZeppelin ERC20 template.

Example constants:
```solidity
string public constant name = "Gem Token";
string public constant symbol = "GEM";
uint8 public constant decimals = 18;


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
