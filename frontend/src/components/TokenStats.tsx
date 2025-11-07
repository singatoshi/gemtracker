import { Card } from "@/components/ui/card";
import { Coins, TrendingUp, Users, Zap } from "lucide-react";

interface TokenStatsProps {
  gemBalance: number;
}

export const TokenStats = ({ gemBalance }: TokenStatsProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Your $GEM Balance</h3>
          <Coins className="w-6 h-6 text-accent" />
        </div>
        <div className="text-4xl font-bold text-accent mb-2">
          {gemBalance.toLocaleString()}
        </div>
        <p className="text-sm text-muted-foreground">
          Earned from engagement
        </p>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Token Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-semibold text-foreground">$0.042</div>
              </div>
            </div>
            <div className="text-sm text-green-500">+12.5%</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Holders</div>
                <div className="font-semibold text-foreground">12,384</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Daily Volume</div>
                <div className="font-semibold text-foreground">847K $GEM</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
