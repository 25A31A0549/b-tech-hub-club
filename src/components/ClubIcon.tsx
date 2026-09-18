import React from 'react';
import { 
  Code2, 
  Bot, 
  Brain, 
  ShieldAlert, 
  Cpu, 
  Camera, 
  Music, 
  BookOpen, 
  Trophy, 
  Rocket, 
  Users 
} from 'lucide-react';

interface ClubIconProps {
  name: string;
  className?: string;
}

export const ClubIcon: React.FC<ClubIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Code2':
      return <Code2 className={className} />;
    case 'Bot':
      return <Bot className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'Rocket':
      return <Rocket className={className} />;
    default:
      return <Users className={className} />;
  }
};
