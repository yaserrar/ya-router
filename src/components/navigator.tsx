import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "../context/navigation-context";

type NavigatorProps<RouteNames extends string> = {
  routes: { [key in RouteNames]: React.ComponentType };
};

export const Navigator = <RouteNames extends string>({
  routes,
}: NavigatorProps<RouteNames>) => {
  const { currentRoute } = useNavigation<RouteNames>();

  const ScreenComponent = routes[currentRoute] as
    | React.ComponentType
    | undefined;

  if (!ScreenComponent) {
    throw new Error(`Route "${currentRoute}" not found in routes.`);
  }

  return <ScreenComponent />;
};
