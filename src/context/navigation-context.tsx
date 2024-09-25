import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { BackHandler } from "react-native";

type NavigationContextProps = {
  currentRoute: string;
  navigate: (route: string) => void;
  replace: (route: string) => void;
  goBack: () => void;
};
const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const NavigationProvider = ({
  initialRoute,
  children,
}: {
  initialRoute: string;
  children: string;
}) => {
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
  const canGoBack = history.length > 1;

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack) {
        goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, [canGoBack, goBack]);

  return (
    <NavigationContext.Provider
      value={{ currentRoute, navigate, replace, goBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = <RouteNames extends string>() => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
};
