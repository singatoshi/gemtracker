import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const TWEETS_ABI = [
  "function postTweet(string calldata text) external",
  "function getTweetCount() external view returns (uint256)",
  "function getTweet(uint256 id) external view returns (address author, string memory text, uint256 timestamp, uint256 likeCount)",
  "function likeTweet(uint256 id, address rewardToken, uint256 rewardAmount) external"
];

const DEFAULT_TWEETS_ADDRESS = "0x0000000000000000000000000000000000000000" // replace after deploy
const REWARD_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000001" // replace after deploy

function App() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    if ((window as any).ethereum) {
      const p = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(p);
    }
  }, []);

  async function connect() {
    if (!provider) return alert("Install MetaMask");
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const signer = await provider.getSigner(0);
    const c = new ethers.Contract(DEFAULT_TWEETS_ADDRESS, TWEETS_ABI, signer);
    setContract(c);
  }

  async function post() {
    if (!contract) return alert("Contract not set");
    const tx = await contract.postTweet(tweetText);
    await tx.wait();
    setTweetText('');
    fetchTweets();
  }

  async function fetchTweets() {
    if (!contract) return;
    const count = await contract.getTweetCount();
    const c = Number(count.toString());
    const arr = [];
    for (let i = 0; i < c; i++) {
      const t = await contract.getTweet(i);
      arr.push({ id: i, author: t[0], text: t[1], ts: Number(t[2].toString()), likes: Number(t[3].toString()) });
    }
    setTweets(arr.reverse());
  }

  useEffect(() => {
    if (contract) fetchTweets();
  }, [contract]);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>BNB SocialFi Prototype</h1>
      {!account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <div>
          <div>Connected Account: {account}</div>
          <div style={{ marginTop: 10 }}>
            <textarea value={tweetText} onChange={(e) => setTweetText(e.target.value)} rows={3} cols={60} />
            <br />
            <button onClick={post} disabled={!tweetText}>Post Tweet (on-chain)</button>
          </div>
          <hr />
          <h2>Feed</h2>
          <button onClick={fetchTweets}>Refresh</button>
          <ul>
            {tweets.map(t => (
              <li key={t.id} style={{ margin: '12px 0', padding: 8, border: '1px solid #eee' }}>
                <div style={{ fontSize: 12, color: '#666' }}>{t.author} • {new Date(t.ts*1000).toLocaleString()}</div>
                <div style={{ marginTop: 6 }}>{t.text}</div>
                <div style={{ marginTop: 6 }}>Likes: {t.likes} <button onClick={async ()=>{ if(!contract) return; const tx = await contract.likeTweet(t.id, REWARD_TOKEN_ADDRESS, 0); await tx.wait(); fetchTweets(); }}>Like</button></div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr />
      <div style={{ fontSize: 12, color: '#999' }}>Notes: Replace contract addresses in App.tsx after deployment. Use BNB Testnet for testing.</div>
    </div>
  );
}

export default App;
