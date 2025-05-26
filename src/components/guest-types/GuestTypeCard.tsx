import React from 'react';
import { motion } from 'framer-motion';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import * as Icons from 'lucide-react';
import { GuestType } from '@/types/guest/guestTypes';
import { LucideProps } from 'lucide-react';

interface GuestTypeCardProps {
  guestType: GuestType;
}

const GuestTypeCard: React.FC<GuestTypeCardProps> = ({ guestType }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const isMobile = useIsMobile();
  
  // Get the icon component dynamically with proper typing
  const IconComponent = (Icons[guestType.icon as keyof typeof Icons] ?? Icons.User) as React.ComponentType<LucideProps>;
  
  const card = (
    <motion.div
      whileHover={{ scale: 1.02 }} // Standardized hover scale
      transition={{ duration: 0.3 }} // Standardized transition duration
      className="w-[384px] h-[386px]" // Updated card size
    >
      <Card
        size="sm"
        padding="md"
        className="flex flex-col items-center space-y-3"
        role="button"
        onClick={() => isMobile && setShowDialog(true)}
      >
        <div className="text-3xl font-bold text-primary">{guestType.code}</div>
        <div className="card-icon bg-primary/10">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold">{guestType.name}</h3>
          <p className="text-sm text-muted-foreground">{guestType.shortDescription}</p>
        </div>
        <div className="flex gap-1 flex-wrap justify-center">
          {guestType.mealPattern.map((meal) => (
            <Badge key={meal} variant="outline" className="text-xs">
              {meal}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  );

  if (isMobile) {
    return (
      <>
        {card}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{guestType.name} (Type {guestType.code})</DialogTitle>
            </DialogHeader>
            <div className="card-content-spacing">
              <p>{guestType.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium">Meals:</h4>
                <div className="flex gap-2">
                  {guestType.mealPattern.map((meal) => (
                    <Badge key={meal}>{meal}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {card}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="card-content-spacing">
          <h4 className="font-semibold">{guestType.name} (Type {guestType.code})</h4>
          <p className="text-sm">{guestType.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GuestTypeCard;
