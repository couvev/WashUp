import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from "react-native";

export default function CarWashDetails({ route }) {
  const { carWash } = route.params;

  // Função para abrir o endereço no mapa
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      carWash.location
    )}`;
    Linking.openURL(url); // Abre o endereço no Google Maps
  };

  const handleScheduleWash = () => {
    alert("Funcionalidade de agendamento em desenvolvimento.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{ uri: carWash.image }} style={styles.carWashImage} />

        <View style={styles.header}>
          <Text style={styles.carWashName}>{carWash.name}</Text>
          <TouchableOpacity style={styles.mapButton} onPress={openInMaps}>
            <Text style={styles.mapButtonText}>Ver no Mapa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.carWashLocation}>
            Endereço: {carWash.location}
          </Text>
          <Text style={styles.carWashPhone}>Telefone: {carWash.phone}</Text>
          <Text style={styles.carWashHours}>
            Horário de Atendimento: {carWash.hours}
          </Text>
        </View>

        <Text style={styles.carWashDescription}>{carWash.description}</Text>

        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleScheduleWash}
        >
          <Text style={styles.scheduleButtonText}>Agendar Lavagem</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  carWashImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  carWashName: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  mapButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  infoContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  carWashLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  carWashPhone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  carWashHours: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  carWashDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  scheduleButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  scheduleButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
