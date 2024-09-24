import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { BackHandler } from "react-native";

type NavigationContextProps<RouteNames extends string> = {
  currentRoute: RouteNames;
  navigate: (route: RouteNames) => void;
  replace: (route: RouteNames) => void;
  goBack: () => void;
};
const NavigationContext = createContext<
  NavigationContextProps<any> | undefined
>(undefined);

export const NavigationProvider = <RouteNames extends string>({
  initialRoute,
  children,
}: {
  initialRoute: RouteNames;
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<RouteNames[]>([initialRoute]);

  const navigate = (route: RouteNames) => {
    setHistory((prev) => [...prev, route]);
  };

  const replace = (route: RouteNames) => {
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
  const context: NavigationContextProps<RouteNames> | undefined =
    useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
