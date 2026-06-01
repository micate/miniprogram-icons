import React, { createContext, useMemo } from 'react';

export interface MiniProgramIconsProviderProps {
  defaultColor?: string;
  defaultSize?: number | string;
  children: React.ReactNode;
}

export const MiniProgramIconsContext = createContext<{ defaultColor?: string; defaultSize?: number | string }>({});

export const MiniProgramIconsProvider: React.FC<MiniProgramIconsProviderProps> = ({ defaultColor, defaultSize, children }) => {
  const value = useMemo(() => ({ defaultColor, defaultSize }), [defaultColor, defaultSize]);
  return <MiniProgramIconsContext.Provider value={value}>{children}</MiniProgramIconsContext.Provider>;
};
