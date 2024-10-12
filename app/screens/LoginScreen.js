import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { login } from "../services/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validação simples dos campos
    if (email === "" || password === "") {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setIsLoading(true); // Mostra o indicador de carregamento
    const response = await login(email, password); // Chama o serviço de login
    setIsLoading(false); // Esconde o indicador de carregamento

    if (response.status === "success") {
      Alert.alert("Sucesso", "Login bem-sucedido!");
      navigation.replace("Home"); // Redireciona para a tela Home
    } else {
      Alert.alert("Erro", response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>WashUp</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#c4c4c4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="********"
        placeholderTextColor="#c4c4c4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.signUpText}>Não tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#2D9CDB",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#333",
    marginTop: 10,
    fontSize: 14,
  },
});
