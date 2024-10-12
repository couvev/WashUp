import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import CarWashDetails from "./app/screens/CarWashDetails"; // Importar a nova tela
import LoginScreen from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CarWashDetails"
          component={CarWashDetails}
          options={{ headerTitle: "Detalhes do Lava Jato" }} // Título da página de detalhes
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
