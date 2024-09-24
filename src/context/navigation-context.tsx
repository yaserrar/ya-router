import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextProps {
  currentRoute: string;
  navigate: (route: string) => void;
  replace: (route: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{
  initialRoute: string;
  children: ReactNode;
}> = ({ initialRoute, children }) => {
  const [history, setHistory] = useState<string[]>([initialRoute]);

  const navigate = (route: string) => {
    setHistory((prev) => [...prev, route]);
  };

  const replace = (route: string) => {
    setHistory((prev) =>
      prev.length > 1 ? [...prev.slice(0, -1), route] : [route]
    );
  };

  const goBack = () => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const currentRoute = history[history.length - 1];

  return (
    <NavigationContext.Provider
      value={{ currentRoute, navigate, replace, goBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
