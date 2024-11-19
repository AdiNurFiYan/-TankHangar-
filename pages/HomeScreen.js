import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/hed.png')} style={styles.headerImage} />
      </View>
      
      <Text style={styles.subtitle}>AN APP FOR TANKPEDIA AND PLAYER SEARCH</Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('TankList')}
        >
          <Image 
            source={require('../assets/34.png')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>TANKS</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('PlayerList')}
        >
          <Image 
            source={require('../assets/player.png')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>PLAYER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34', 
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 60, 
  },
  header: {
    width: '100%',
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    position: 'absolute',
    zIndex: 1, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
  },
  headerImage: {
    width: 200, 
    height: 100, 
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 16, 
    color: '#ffffff', 
    marginBottom: 32,
    marginTop: 100, 
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  card: {
    backgroundColor: '#34373c', 
    borderRadius: 10,
    width: '45%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: 80, 
    height: 80, 
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16, 
    color: '#FFFFFF',
  },
});

export default HomeScreen;
