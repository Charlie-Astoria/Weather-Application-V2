// weather-app/App.js
// Entry point for the React Native app.
// Sets up bottom tab navigation with Overview, Today, Forecast, History, and Settings.

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import OverviewScreen from "./screens/OverviewScreen";
import TodayScreen from "./screens/TodayScreen";
import ForecastScreen from "./screens/ForecastScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [autoReadWeather, setAutoReadWeather] = useState(false);
  const [voiceOnTap, setVoiceOnTap] = useState(false);
  const [theme, setTheme] = useState("system");

  // Map theme to background and text colors
  const getThemeStyles = () => {
    switch (theme) {
      case "dark":
        return {
          tabBarBg: "#020617",
          tabBarBorder: "#1f2937",
        };
      case "light":
        return {
          tabBarBg: "#f8fafc",
          tabBarBorder: "#e2e8f0",
        };
      default: // system
        return {
          tabBarBg: "#020617",
          tabBarBorder: "#1f2937",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: themeStyles.tabBarBg, 
            borderTopColor: themeStyles.tabBarBorder 
          },
          tabBarActiveTintColor: theme === "light" ? "#1e293b" : "#bfdbfe",
          tabBarInactiveTintColor: theme === "light" ? "#94a3b8" : "#6b7280",
          tabBarIcon: ({ color, size }) => {
            let iconName = "ellipse-outline";
            if (route.name === "Overview") iconName = "grid-outline";
            if (route.name === "Today") iconName = "sunny-outline";
            if (route.name === "Forecast") iconName = "calendar-outline";
            if (route.name === "History") iconName = "time-outline";
            if (route.name === "Settings") iconName = "settings-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Overview" options={{ title: "Overview" }}>
          {(props) => (
            <OverviewScreen
              {...props}
              autoReadWeather={autoReadWeather}
              voiceOnTap={voiceOnTap}
              theme={theme}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Today" options={{ title: "Today" }}>
          {(props) => (
            <TodayScreen
              {...props}
              autoReadWeather={autoReadWeather}
              voiceOnTap={voiceOnTap}
              theme={theme}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Forecast" options={{ title: "Forecast" }}>
          {(props) => (
            <ForecastScreen
              {...props}
              theme={theme}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="History" options={{ title: "History" }}>
          {(props) => (
            <HistoryScreen
              {...props}
              theme={theme}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Settings" options={{ title: "Settings" }}>
          {(props) => (
            <SettingsScreen
              {...props}
              autoReadWeather={autoReadWeather}
              setAutoReadWeather={setAutoReadWeather}
              voiceOnTap={voiceOnTap}
              setVoiceOnTap={setVoiceOnTap}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
