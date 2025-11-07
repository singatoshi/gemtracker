import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [showReward, setShowReward] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setShowReward(true);
      onLike(post.id);
      toast.success(
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-accent" />
          <span>+10 $GEM earned!</span>
        </div>
      );
      setTimeout(() => setShowReward(false), 2000);
    }
  };

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/20 transition-all hover:shadow-lg relative overflow-hidden group">
      <div className="flex gap-4">
        <Avatar className="w-12 h-12 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {post.author.slice(2, 4).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-semibold text-foreground">
                {post.author.slice(0, 6)}...{post.author.slice(-4)}
              </div>
              <div className="text-sm text-muted-foreground">{post.timestamp}</div>
            </div>
          </div>
          
          <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
          
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "group/like hover:bg-primary/5 relative",
                isLiked && "text-primary"
              )}
            >
              <Heart 
                className={cn(
                  "w-5 h-5 mr-2 transition-all",
                  isLiked && "fill-primary scale-110"
                )}
              />
              <span className={cn(isLiked && "text-primary font-medium")}>
                {post.likes + (isLiked ? 1 : 0)}
              </span>
              {showReward && (
                <div className="absolute -top-8 left-0 flex items-center gap-1 text-accent font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Coins className="w-4 h-4" />
                  +10
                </div>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-primary/5 hover:text-primary"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {post.comments}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-primary/5 hover:text-primary"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
