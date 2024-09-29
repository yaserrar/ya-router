# YA Router

ya-router is a lightweight and type-safe navigation library for React Native and Expo, designed to make page routing simple and intuitive. Built with TypeScript and Zustand for state management, it allows easy navigation between screens while ensuring type safety for route names.

### Features

- Lightweight and easy to use
- Type-safe route navigation using TypeScript generics
- Supports history-based navigation with navigate, replace, and goBack methods
- Flexible and dynamic routes for any React Native project

### Installation

To install ya-router in your project:
`npm install ya-router`

### Usage

#### Defining Routes

You define routes by creating an object that maps route names to components:

```
import { HomeScreen, AboutScreen } from './screens';
const routes = {
  home: HomeScreen,
  about: AboutScreen,
};
```

#### Using the Navigator

Wrap your app with the NavigationProvider and pass the routes and initialRoute:

```
import { NavigationProvider, Navigator } from 'ya-router';
export default function App() {
  return (
    <NavigationProvider initialRoute="home">
      <Navigator routes={routes} />
    </NavigationProvider>
  );
}
```

#### Navigating Between Screens

Use the useNavigation hook to navigate between screens:

```
import { useNavigation } from 'ya-router';
const MyComponent = () => {
  const { navigate, replace, goBack } = useNavigation<keyof typeof routes>();
  return (
    <>
      <Button title="Go to About" onPress={() => navigate('about')} />
      <Button title="Replace with Home" onPress={() => replace('home')} />
      <Button title="Go Back" onPress={goBack} />
    </>
  );
};
```

### License

This project is licensed under the MIT License - see the LICENSE file for details.
