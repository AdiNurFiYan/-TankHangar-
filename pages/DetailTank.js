import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";

const DetailTank = ({ route }) => {
  const { tankId, tankName } = route.params;
  const [tankData, setTankData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTankDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.wotblitz.asia/wotb/encyclopedia/vehicles/?application_id=c2ea89d89b43f8ce20c935966c349fbb&language=en`
        );

        if (response.data && response.data.data) {
          const tankDetails = response.data.data[tankId];
          setTankData(tankDetails);
        } else {
          setTankData(null);
        }
      } catch (error) {
        console.error("Failed to fetch tank details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTankDetails();
  }, [tankId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  if (!tankData) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderText}>Tank data not available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stickyNameCard}>
        <Text style={styles.tankName}>{tankData.name || "Unknown"}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
<View style={styles.imageCard}>
  {tankData.images && tankData.images.normal ? (
    <ImageBackground
      source={require("../assets/hangar.png")} 
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <Image
        source={{ uri: tankData.images.normal }}
        style={styles.tankImage}
        resizeMode="contain"
      />
    </ImageBackground>
  ) : (
    <Text style={styles.noImageText}>Image not available</Text>
  )}
</View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>

          <Text style={styles.detailText}>
            {tankData.description || "No description available"}
          </Text>

          <Text style={styles.sectionTitle}>{"\n"}DETAILS</Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Nation: </Text>
            {tankData.nation || "Unknown"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Tier: </Text>
            {tankData.tier || "Unknown"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Type: </Text>
            {tankData.type || "Unknown"}
          </Text>

          <Text style={styles.sectionTitle}>{"\n"}COST</Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Credits: </Text>
            {tankData.cost?.price_credit
              ? tankData.cost.price_credit.toLocaleString()
              : "N/A"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Gold: </Text>
            {tankData.cost?.price_gold
              ? tankData.cost.price_gold.toLocaleString()
              : "N/A"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C34",
    paddingBottom: 65,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  loaderText: {
    color: "#FFF",
    marginTop: 8,
    fontSize: 16,
  },
  stickyNameCard: {
    position: "absolute", 
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 20,
    zIndex: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tankName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000",
  },
  scrollContent: {
    paddingTop: 90, 
    paddingHorizontal: 16,
  },
  imageCard: {
    backgroundColor: "#34373c",
    padding: 1,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
  },
  tankImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  noImageText: {
    color: "#FFF",
    fontSize: 16,
  },
  detailCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 4,
    textAlign: "justify",
    lineHeight: 24,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  imageBackground: {
    width: "100%",
    height: 200, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 12, 
    overflow: "hidden",
  },
});

export default DetailTank;
