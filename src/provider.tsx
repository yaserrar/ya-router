import React, { useEffect, useState } from "react";
import { useNavigation } from "./store";
import { BackHandler } from "react-native";

type Props = {
  children: React.ReactNode;
  initialRoute: string;
};

export const Provider = ({ children, initialRoute }: Props) => {
  const { navigate, goBack, history } = useNavigation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    navigate(initialRoute);
    setMounted(true);
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (history.length > 1) {
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
  }, [history, goBack]);

  if (!mounted) return <></>;

  return <>{children}</>;
};
