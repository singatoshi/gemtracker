import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Coins } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletButtonProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  address?: string;
  gemBalance: number;
}

export const WalletButton = ({ 
  isConnected, 
  onConnect, 
  onDisconnect, 
  address,
  gemBalance 
}: WalletButtonProps) => {
  if (!isConnected) {
    return (
      <Button 
        onClick={onConnect}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-primary/30 hover:bg-primary/5">
          <Wallet className="w-4 h-4 mr-2" />
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        <DropdownMenuLabel className="text-foreground">My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <div className="px-2 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">$GEM Balance</span>
            <div className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-accent" />
              <span className="font-semibold text-accent">{gemBalance.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {address}
          </div>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem 
          onClick={onDisconnect}
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
