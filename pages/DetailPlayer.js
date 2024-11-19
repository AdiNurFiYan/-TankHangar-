import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const DetailPlayer = () => {
  const route = useRoute();
  const { playerId, playerName } = route.params;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(
          `https://api.wotblitz.asia/wotb/account/info/?application_id=c2ea89d89b43f8ce20c935966c349fbb&account_id=${playerId}`
        );
        const playerStats = response.data?.data?.[playerId]?.statistics?.all;
        setStats(playerStats);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.playerName}>{playerName}</Text>
      </View>

      <View style={styles.card1}>
        {stats ? (
          <>
            <Text style={styles.statText}>Battles: {stats.battles || "N/A"}</Text>
            <Text style={styles.statText}>Wins: {stats.wins || "N/A"}</Text>
            <Text style={styles.statText}>Losses: {stats.losses || "N/A"}</Text>
            <Text style={styles.statText}>Win and Survived: {stats.win_and_survived || "N/A"}</Text>
            <Text style={styles.statText}>Damage Dealt: {stats.damage_dealt || "N/A"}</Text>
            <Text style={styles.statText}>Maximum XP: {stats.max_xp || "N/A"}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading stats...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C34",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    marginBottom: 20,
    marginTop: 60,
    marginRight: 80,
    alignItems: "center",
  },
  card1: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 20,
    paddingLeft: 40,
    marginLeft: 80,
    width: "100%",
    marginBottom: 20,
    marginTop: 80,
  },
  playerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
  },
  statText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
    textAlign: "left",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});

export default DetailPlayer;
