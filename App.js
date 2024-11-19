import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";

import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import TankList from './pages/TankList';
import DetailPlayer from './pages/DetailPlayer';
import DetailTank from './pages/DetailTank';
import PlayerList from './pages/PlayerList'; 
import DetailClan from './pages/DetailClan';
import ClanSearch from './pages/ClanSearch';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TankList"
        component={TankList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayerList"
        component={PlayerList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPlayer"
        component={DetailPlayer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailTank"
        component={DetailTank}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClanSearch"
        component={ClanSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailClan"
        component={DetailClan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightgray",
          marginHorizontal: 16,
          borderRadius: 24,
          height: 42,
          marginBottom: 20,
          shadowOpacity: 0,
          elevation: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
            color = focused ? "black" : "lightgray";
          } else if (route.name === "Profile") {
            iconName = "person";
            color = focused ? "black" : "lightgray";
          } else if (route.name === "ClanSearch") {
            iconName = "organization";
            color = focused ? "black" : "lightgray";
          }

          return <Octicons name={iconName} size={24} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="ClanSearch" component={ClanSearch} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
