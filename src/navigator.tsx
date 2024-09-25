import React from "react";
import { useNavigation } from "./store";

type NavigatorProps = {
  routes: { [key: string]: React.ComponentType };
};

export const Navigator = ({ routes }: NavigatorProps) => {
  const { currentRoute } = useNavigation<string>();

  if (!currentRoute) {
    throw new Error(`Route not found in routes.`);
  }

  const ScreenComponent = routes[currentRoute];

  if (!ScreenComponent) {
    throw new Error(`Route "${currentRoute}" not found in routes.`);
  }

  return <ScreenComponent />;
};
