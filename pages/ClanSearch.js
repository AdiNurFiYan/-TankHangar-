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

const ClanSearch = () => {
  const [clans, setClans] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const fetchClans = async (name) => {
    try {
      const response = await axios.get(
        `https://api.wotblitz.asia/wotb/clans/list/?application_id=c2ea89d89b43f8ce20c935966c349fbb&search=${name}`
      );

      if (response.data?.data?.length > 0) {
        setClans(response.data.data);
      } else {
        Alert.alert("No Results", "No clans found with the given name.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch clans. Please try again.");
    }
  };

  const onSearchChange = (text) => {
    setSearch(text);
    if (text.length > 2) {
      fetchClans(text);
    } else {
      setClans([]);
    }
  };

  const navigateToDetailClan = (clan) => {
    navigation.navigate("Home", {
      screen: "DetailClan", 
      params: {
        clanId: clan.clan_id,
        clanName: clan.name,
      },
    });
  };
  

  const renderClanCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToDetailClan(item)}
    >
      <ImageBackground
        source={require("../assets/bck2.png")}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.clanName}>{item.name}</Text>
          <Text style={styles.clanTag}>[{item.tag}]</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText={"Clan Search"} />

      <TextInput
        style={styles.searchBar}
        placeholder="Search Clans..."
        placeholderTextColor="#B0B0B0"
        value={search}
        onChangeText={onSearchChange}
      />

      <FlatList
        data={clans}
        renderItem={renderClanCard}
        keyExtractor={(item) => item.clan_id.toString()}
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
    alignItems: "center",
  },
  clanName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  clanTag: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "bold",
  },
});

export default ClanSearch;
