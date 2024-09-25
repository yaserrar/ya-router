import React from "react";
import { useNavigation } from "../context/navigation-context";

type NavigatorProps = {
  routes: { [key: string]: React.ComponentType };
};

export const Navigator = ({ routes }: NavigatorProps) => {
  const { currentRoute } = useNavigation();

  const ScreenComponent = routes[currentRoute];

  if (!ScreenComponent) {
    throw new Error(`Route "${currentRoute}" not found in routes.`);
  }

  return <ScreenComponent />;
};
