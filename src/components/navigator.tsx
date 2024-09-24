import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "../context/navigation-context";

interface NavigatorProps {
  routes: { [key: string]: React.ComponentType };
}

export const Navigator: React.FC<NavigatorProps> = ({ routes }) => {
  const { currentRoute } = useNavigation();
  const ScreenComponent = routes[currentRoute];

  if (!ScreenComponent) {
    throw new Error(`Route "${currentRoute}" not found in routes.`);
  }

  return (
    <SafeAreaView>
      <Text>{currentRoute}</Text>
      <ScreenComponent />
    </SafeAreaView>
  );
};
