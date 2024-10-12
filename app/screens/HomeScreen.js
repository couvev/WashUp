import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { carWashes } from "../../carWashData"; // Importando os dados fictícios

// Dados fictícios do cliente
const clientData = {
  name: "João da Silva",
  email: "joao@example.com",
  phone: "(11) 98765-4321",
};

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal

  const renderCarWash = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("CarWashDetails", { carWash: item })}
    >
      <View style={styles.carWashItem}>
        <Image source={{ uri: item.image }} style={styles.carWashImage} />
        <View style={styles.carWashInfo}>
          <Text style={styles.carWashName}>{item.name}</Text>
          <Text>{item.location}</Text>
          <Text>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace("Login"); // Redireciona para a tela de login
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pesquisar</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Pesquisar Lava Jato..."
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity
              style={styles.profileCircle}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.profileInitial}>J</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={carWashes}
          keyExtractor={(item) => item.id}
          renderItem={renderCarWash}
          contentContainerStyle={styles.listContainer}
        />

        {/* Modal para exibir dados do cliente */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.clientInfo}>Nome: {clientData.name}</Text>
              <Text style={styles.clientInfo}>E-mail: {clientData.email}</Text>
              <Text style={styles.clientInfo}>
                Telefone: {clientData.phone}
              </Text>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2D9CDB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  carWashItem: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
  },
  carWashImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  carWashInfo: {
    flex: 1,
  },
  carWashName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  clientInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
