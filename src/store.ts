import { create } from "zustand";

type State<
  Screens extends { [key: string]: { [key: string]: any } | undefined }
> = {
  currentRoute: { name: keyof Screens; props?: Screens[keyof Screens] } | null;
  history: { name: keyof Screens; props?: Screens[keyof Screens] }[];
};

type Action<
  Screens extends { [key: string]: { [key: string]: any } | undefined }
> = {
  navigate: (route: {
    name: keyof Screens;
    props?: Screens[keyof Screens];
  }) => void;
  replace: (route: {
    name: keyof Screens;
    props?: Screens[keyof Screens];
  }) => void;
  goBack: () => void;
};

export const useNavigation = <
  Screens extends { [key: string]: { [key: string]: any } | undefined }
>() =>
  create<State<Screens> & Action<Screens>>((set) => ({
    currentRoute: null,
    history: [],
    navigate: (route) =>
      set(({ history }) => ({
        currentRoute: route,
        history: [...history.filter((r) => r.name !== route.name), route],
      })),
    replace: (route) =>
      set(({ history }) => ({
        currentRoute: route,
        history:
          history.length > 1
            ? [
                ...history.slice(0, -1).filter((r) => r.name !== route.name),
                route,
              ]
            : [route],
      })),
    goBack: () =>
      set(({ history }) => ({
        currentRoute:
          history.length > 1 ? history[history.length - 2] : history[0],
        history: history.length > 1 ? history.slice(0, -1) : history,
      })),
  }))();
