import { Button } from "@/components/ui/button";
import { Wallet, Coins, Heart, Zap } from "lucide-react";

interface HeroProps {
  onConnectWallet: () => void;
  isConnected: boolean;
}

export const Hero = ({ onConnectWallet, isConnected }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Built on BNB Chain</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Track. Engage. Earn.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Track your social engagement and earn $GEM tokens. Every like, every post, tracked and rewarded.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            {!isConnected ? (
              <Button 
                onClick={onConnectWallet}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all group"
              >
                <Wallet className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-medium">Wallet Connected</span>
              </div>
            )}
            
            <Button 
              size="lg"
              variant="outline"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-in fade-in duration-700 delay-500">
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Engage & Earn</h3>
              <p className="text-sm text-muted-foreground text-center">
                Like posts and earn $GEM rewards
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                <Coins className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">$GEM Tokens</h3>
              <p className="text-sm text-muted-foreground text-center">
                Native rewards for creators
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">On-Chain</h3>
              <p className="text-sm text-muted-foreground text-center">
                Fully decentralized on BNB Chain
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
