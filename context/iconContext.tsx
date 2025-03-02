import React, { createContext, useContext } from 'react';
import { Search, Star, TrendingUp, Gem, Menu, Bot,LoaderPinwheel } from 'lucide-react-native';

const IconMap = {
  search: Search,
  star: Star,
  trending: TrendingUp,
  diamond: Gem,
  menu: Menu,
  robot: Bot,
  explore: LoaderPinwheel,
};

export type IconName = keyof typeof IconMap;

interface IconContextType {
  getIcon: (name: IconName) => React.ElementType;
}

const IconContext = createContext<IconContextType>({
  getIcon: () => () => null,
});

export function IconProvider({ children }: { children: React.ReactNode }) {
  const getIcon = (name: IconName) => {
    const Icon = IconMap[name];
    return (props: any) => <Icon {...props} color="#333" strokeWidth={2} />;
  };

  return (
    <IconContext.Provider value={{ getIcon }}>
      {children}
    </IconContext.Provider>
  );
}

export function useIcon(name: IconName) {
  const context = useContext(IconContext);
  const Icon = context.getIcon(name);
  return Icon;
}
