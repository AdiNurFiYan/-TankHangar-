import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const fetchPlayers = async (nickname) => {
    try {
      const response = await axios.get(
        `https://api.wotblitz.asia/wotb/account/list/?application_id=c2ea89d89b43f8ce20c935966c349fbb&search=${nickname}`
      );
      if (response.data?.data?.length > 0) {
        setPlayers(response.data.data);
      } else {
        Alert.alert("No Results", "No players found with the given nickname.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch players. Please try again.");
    }
  };

  const onSearchChange = (text) => {
    setSearch(text);
    if (text.length > 2) {
      fetchPlayers(text);
    } else {
      setPlayers([]);
    }
  };

  const navigateToPlayerDetail = (player) => {
    navigation.navigate("DetailPlayer", {
      playerId: player.account_id,
      playerName: player.nickname,
    });
  };

  const renderPlayerCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToPlayerDetail(item)}
    >
      <ImageBackground
        source={require("../assets/bck2.png")} 
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 8 }} 
      >
        <View style={styles.cardContent}>
          <Text style={styles.playerName}>{item.nickname}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText={"Player Search"} />

      <TextInput
        style={styles.searchBar}
        placeholder="Search Players..."
        placeholderTextColor="#B0B0B0"
        value={search}
        onChangeText={onSearchChange}
      />

      <FlatList
        data={players}
        renderItem={renderPlayerCard}
        keyExtractor={(item) => item.account_id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C34",
    paddingBottom: 65,
  },
  searchBar: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#34373c",
    color: "#FFF",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
  },
  imageBackground: {
    padding: 16,
    borderRadius: 8,
    overflow: "hidden", 
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    flex: 1,
  },
});

export default PlayerList;
