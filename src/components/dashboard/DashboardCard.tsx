import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const DashboardCard = ({ title, description, link, icon, onClick, className }: DashboardCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full max-w-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maritime-teal group ${className}`}
    >
      <Card className="border border-maritime-teal/20 group-hover:border-maritime-teal group-hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-64 flex flex-col justify-center">
        <CardHeader className="flex items-center text-center p-6">
          <div>
            <div className="mx-auto p-3 rounded-full bg-maritime-teal/10 group-hover:bg-maritime-teal/20 transition-colors duration-300 w-fit mb-4">
              {icon}
            </div>
            <CardTitle className="font-playfair text-xl text-maritime-teal group-hover:text-maritime-teal mb-3">{title}</CardTitle>
            <CardDescription className="text-gray-600 line-clamp-2">{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </button>
  );
};

export default DashboardCard;
