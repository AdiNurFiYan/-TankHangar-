import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

function TankList() {
  const [tanks, setTanks] = useState([]);
  const [filteredTanks, setFilteredTanks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedNation, setSelectedNation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.wotblitz.asia/wotb/encyclopedia/vehicles/?application_id=c2ea89d89b43f8ce20c935966c349fbb"
        );

        const tankData = Object.values(response.data.data);
        setTanks(tankData);
        setFilteredTanks(tankData);
      } catch (error) {
        Alert.alert("Gagal!", error.message);
      }
    }

    fetchData();
  }, []);

  const applyFilters = (searchText, tier, nation, type) => {
    let newData = tanks;

    if (searchText) {
      const textData = searchText.toUpperCase();
      newData = newData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    }

    if (tier) {
      newData = newData.filter((item) => item.tier === parseInt(tier));
    }

    if (nation) {
      newData = newData.filter((item) => item.nation === nation);
    }

    if (type) {
      newData = newData.filter((item) => item.type === type);
    }

    setFilteredTanks(newData);
  };

  const onSearchChange = (text) => {
    setSearch(text);
    applyFilters(text, selectedTier, selectedNation, selectedType);
  };

  const onTierChange = (tier) => {
    setSelectedTier(tier);
    applyFilters(search, tier, selectedNation, selectedType);
  };

  const onNationChange = (nation) => {
    setSelectedNation(nation);
    applyFilters(search, selectedTier, nation, selectedType);
  };

  const onTypeChange = (type) => {
    setSelectedType(type);
    applyFilters(search, selectedTier, selectedNation, type);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedTier("");
    setSelectedNation("");
    setSelectedType("");
    setFilteredTanks(tanks);
  };

  const renderTankCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailTank', { tankId: item.tank_id, tankName: item.name })}
    >
      <Image
        source={{ uri: item.images.preview }}
        style={styles.image}
      />
      <Text style={styles.tankName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerText={"DAFTAR TANK"}
        flexPosition={"flex-start"}
      />

      <TextInput
        style={styles.searchBar}
        placeholder="Cari Tank..."
        placeholderTextColor="#B0B0B0"
        value={search}
        onChangeText={onSearchChange}
      />

      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedTier}
          onValueChange={onTierChange}
          style={styles.picker}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((tier) => (
            <Picker.Item key={tier} label={`Tier ${tier}`} value={tier.toString()} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedNation}
          onValueChange={onNationChange}
          style={styles.picker}
        >
          <Picker.Item label="Other" value="other" />
          <Picker.Item label="USA" value="usa" />
          <Picker.Item label="Germany" value="germany" />
          <Picker.Item label="USSR" value="ussr" />
          <Picker.Item label="UK" value="uk" />
          <Picker.Item label="China" value="china" />
          <Picker.Item label="Japan" value="japan" />
          <Picker.Item label="France" value="france" />
          <Picker.Item label="European Nations" value="european" />
        </Picker>

        <Picker
          selectedValue={selectedType}
          onValueChange={onTypeChange}
          style={styles.picker}
        >
          <Picker.Item label="Light Tank" value="lightTank" />
          <Picker.Item label="Medium Tank" value="mediumTank" />
          <Picker.Item label="Heavy Tank" value="heavyTank" />
          <Picker.Item label="Tank Destroyer" value="AT-SPG" />
        </Picker>
      </View>

      <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Filter</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredTanks}
        renderItem={renderTankCard}
        keyExtractor={(item) => item.tank_id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C34",
    paddingBottom: 65,
  },
  listContainer: {
    paddingTop: 16,
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#FFF",
    backgroundColor: "#34373c",
    marginHorizontal: 4,
  },
  resetButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#34373c",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  tankName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default TankList;
