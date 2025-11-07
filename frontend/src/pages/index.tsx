import { useState } from "react";
import { Hero } from "@/components/Hero";
import { WalletButton } from "@/components/WalletButton";
import { CreatePost } from "@/components/CreatePost";
import { PostCard, Post } from "@/components/PostCard";
import { TokenStats } from "@/components/TokenStats";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    author: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    content: "Just earned my first 100 $GEM tokens! This platform is amazing 🚀",
    likes: 24,
    comments: 5,
    timestamp: "2h ago"
  },
  {
    id: "2",
    author: "0x9f3B2c0A5a7E8b3C4d6E1f2A3b4C5d6E7f8A9b0C",
    content: "Building on BNB Chain is so smooth. The future of social media is decentralized!",
    likes: 42,
    comments: 12,
    timestamp: "5h ago"
  },
  {
    id: "3",
    author: "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B",
    content: "Love the concept of earning rewards for engagement. Web3 social is the way! 💎",
    likes: 18,
    comments: 3,
    timestamp: "8h ago"
  }
];

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [gemBalance, setGemBalance] = useState(250);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    setWalletAddress(mockAddress);
    setIsConnected(true);
    toast.success("Wallet connected successfully!");
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(undefined);
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: walletAddress || "0x000",
      content,
      likes: 0,
      comments: 0,
      timestamp: "Just now"
    };
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId: string) => {
    setGemBalance(prev => prev + 10);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GemTracker</h1>
                <p className="text-xs text-muted-foreground">Track & Earn on BNB Chain</p>
              </div>
            </div>
            
            <WalletButton
              isConnected={isConnected}
              onConnect={handleConnectWallet}
              onDisconnect={handleDisconnectWallet}
              address={walletAddress}
              gemBalance={gemBalance}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onConnectWallet={handleConnectWallet} isConnected={isConnected} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-6">
            {isConnected && (
              <CreatePost onPost={handleCreatePost} userAddress={walletAddress} />
            )}
            
            {!isConnected && (
              <div className="text-center py-8 bg-card/50 rounded-xl border border-border">
                <p className="text-muted-foreground mb-4">Connect your wallet to start posting</p>
              </div>
            )}

            <div className="space-y-4">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {isConnected ? (
                <TokenStats gemBalance={gemBalance} />
              ) : (
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Get Started
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your wallet to start earning $GEM tokens for your engagement.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Post content
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Like posts to earn
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Build your reputation
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
