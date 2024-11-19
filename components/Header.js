import { Text, View, StyleSheet } from "react-native";

const Header = ({ headerText }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginBottom: 10,
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#282C34', 
    paddingTop: 10,
  },
});

export default Header;
