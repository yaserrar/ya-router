import { create } from "zustand";

type State<RouteKeys extends string> = {
  currentRoute: RouteKeys | null;
  history: RouteKeys[];
};

type Action<RouteKeys extends string> = {
  navigate: (route: RouteKeys) => void;
  replace: (route: RouteKeys) => void;
  goBack: () => void;
};

export const useNavigation = <RouteKeys extends string>() =>
  create<State<RouteKeys> & Action<RouteKeys>>((set) => ({
    currentRoute: null,
    history: [],
    navigate: (route) =>
      set(({ history }) => ({
        currentRoute: route,
        history: [...history.filter((r) => r !== route), route],
      })),
    replace: (route) =>
      set(({ history }) => ({
        currentRoute: route,
        history:
          history.length > 1
            ? [...history.slice(0, -1).filter((r) => r !== route), route]
            : [route],
      })),
    goBack: () =>
      set(({ history }) => ({
        currentRoute:
          history.length > 1 ? history[history.length - 2] : history[0],
        history: history.length > 1 ? history.slice(0, -1) : history,
      })),
  }))();
