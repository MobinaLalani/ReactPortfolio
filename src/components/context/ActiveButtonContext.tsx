import React, { createContext, useContext, useState, ReactNode } from "react";

type ActiveButtonContextType = {
  activeButton: string;
  setActiveButton: (value: string) => void;
};

const ActiveButtonContext = createContext<ActiveButtonContextType | undefined>(
  undefined
);

export const ActiveButtonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeButton, setActiveButton] = useState<string>("acceptance");

  return (
    <ActiveButtonContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </ActiveButtonContext.Provider>
  );
};


export const useActiveButton = () => {
  const context = useContext(ActiveButtonContext);
  if (!context) {
    throw new Error(
      "useActiveButton باید داخل ActiveButtonProvider استفاده شود"
    );
  }
  return context;
};
