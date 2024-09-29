import React from "react";
import { useNavigation } from "./store";

type NavigatorProps = {
  routes: { [key: string]: (props: any) => React.JSX.Element };
};

export const Navigator = ({ routes }: NavigatorProps) => {
  const { currentRoute } = useNavigation<any>();

  if (!currentRoute) {
    throw new Error(`Route not found in routes.`);
  }

  const ScreenComponent = routes[currentRoute.name as string];

  if (!ScreenComponent) {
    throw new Error(`Route "${currentRoute}" not found in routes.`);
  }

  return <ScreenComponent {...currentRoute.props} />;
};
