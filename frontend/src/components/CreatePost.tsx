import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlus, Send } from "lucide-react";
import { toast } from "sonner";

interface CreatePostProps {
  onPost: (content: string) => void;
  userAddress?: string;
}

export const CreatePost = ({ onPost, userAddress }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Post cannot be empty");
      return;
    }
    onPost(content);
    setContent("");
    toast.success("Post published!");
  };

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/20 transition-colors">
      <div className="flex gap-4">
        <Avatar className="w-12 h-12 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {userAddress?.slice(2, 4).toUpperCase() || "??"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="What's happening on-chain?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none bg-background border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
          />
          
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
