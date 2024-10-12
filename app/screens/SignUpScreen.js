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
import { createAccount } from "../services/authService";

// Função de validação de e-mail
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função de formatação de telefone com limite de 12 dígitos
const formatPhoneNumber = (phone) => {
  const cleaned = ("" + phone).replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos (código de área + número)
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Função de formatação de CPF com limite de 11 dígitos
const formatCPF = (cpf) => {
  const cleaned = ("" + cpf).replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return cpf;
};

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo campo de confirmação de senha
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Verifica se as senhas conferem

  const handleSignUp = async () => {
    // Validação dos campos
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      phone === "" ||
      cpf === ""
    ) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      setPasswordsMatch(false);
      return;
    }

    setIsLoading(true); // Mostra o indicador de carregamento
    const response = await createAccount(email, password, phone, cpf); // Chama o serviço de criação de conta
    setIsLoading(false); // Esconde o indicador de carregamento

    if (response.status === "success") {
      Alert.alert("Sucesso", response.message);
      navigation.navigate("Login");
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
        placeholder="Senha"
        placeholderTextColor="#c4c4c4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, !passwordsMatch && styles.inputError]} // Adiciona borda vermelha se as senhas não coincidirem
        placeholder="Confirme sua senha"
        placeholderTextColor="#c4c4c4"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setPasswordsMatch(text === password); // Atualiza a verificação em tempo real
        }}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#c4c4c4"
        value={phone}
        onChangeText={(text) => setPhone(formatPhoneNumber(text))} // Aplica formatação e limita a 12 dígitos
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#c4c4c4"
        value={cpf}
        onChangeText={(text) => setCpf(formatCPF(text))} // Aplica formatação e limita a 11 dígitos
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Criar Conta</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signInText}>Já tenho conta</Text>
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
  inputError: {
    borderColor: "red", // Borda vermelha quando as senhas não coincidem
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
  signInText: {
    color: "#333",
    marginTop: 10,
    fontSize: 14,
  },
});
