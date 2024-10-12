import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/screens/LoginScreen"; // Certifique-se que o caminho está correto

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Remove o cabeçalho da tela de login
        />
        {/* Outras telas podem ser adicionadas aqui no futuro */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
