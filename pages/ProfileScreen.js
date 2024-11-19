import React from "react";
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Linking } from "react-native";

function ProfileScreen() {
  const openGithub = () => {
    Linking.openURL("https://github.com/adinurfiyan");
  };

  return (
    <ImageBackground
      source={{ uri: "https://svgdb.me/assets/bgs/bg_quest.png" }}
      style={style.background}
      resizeMode="cover"
    >
      <View style={style.container}>
        <View style={style.imageContainer}>
          <ImageBackground
            source={{ uri: "https://svgdb.me/assets/emblems/em_200000043_m.png" }}
            style={style.image}
          />
        </View>

        <View style={style.card}>
          <Text style={style.name}>ADI NUR FI YAN</Text>
          <Text style={style.nim}>21120122120010</Text>
          <TouchableOpacity onPress={openGithub} style={style.githubButton}>
            <Text style={style.githubText}>HTTPS://GITHUB.COM/ADINURFIYAN</Text>
          </TouchableOpacity>
        </View>

        <View style={style.aboutCard}>
  <Text style={style.aboutTitle}>About</Text>
  <Text style={style.aboutText}>
    Halo gaes! Saya Adi Nur Fi Yan, kali ini saya membuat aplikasi Android dengan API 
    World of Tanks Blitz. Aplikasi ini memiliki fungsi untuk pencarian tank, clan dan deskripsinya,
    serta pencarian profile.{"\n"}{"\n"}
    Thanks for the Skibidi vibes, may my Goon gain some Sigma scores, thanks.
  </Text>
</View>

      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "50%",
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 200, 
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    alignItems: "center",
    marginTop: 80, 
  },
  imageContainer: {
    position: "absolute",
    top: -70, 
    zIndex: 1, 
    width: 160,
    height: 160,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 8,
  },
  nim: {
    fontSize: 18,
    color: "gray",
  },
  githubButton: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 30,
  },
  githubText: {
    color: "#000",
    fontWeight: "bold",
  },
  aboutCard: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    padding: 20,
    width: "100%", 
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
  },
});

export default ProfileScreen;
