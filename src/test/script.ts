import { useNavigation } from "../context/navigation-context";

const Comp = () => {
  const { currentRoute, goBack, navigate, replace } = useNavigation();

  navigate("");
};
