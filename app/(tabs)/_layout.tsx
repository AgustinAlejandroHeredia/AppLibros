import { Tabs } from "expo-router";

import colors from "@/lib/styles/colors";

// ICONS
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="home" size={24} color={color} />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            );
          },
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome name="bookmark" size={24} color={color} />
            ) : (
              <FontAwesome name="bookmark-o" size={24} color="black" />
            );
          },
        }}
      />
    </Tabs>
  );
}
