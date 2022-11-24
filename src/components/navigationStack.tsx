import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

import { DiagnosticScreen } from "../screens/DiagnosticScreen";
import { ContactsScreen } from "../screens/ContactsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, StyleSheet } from "react-native";
import { useThemeCustom } from "../utils/ThemeProvider";

const Stack = createStackNavigator<MainParamList>();

export type MainParamList = {
  Home: undefined;
  Diagnostic: undefined;
  Contacts: undefined;
  Settings: undefined;
};

export const NavigationStack = () => {
  const { colorsSchema } = useThemeCustom();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            cardStyle: { backgroundColor: colorsSchema.background },
            headerStyle: {
              backgroundColor: colorsSchema.background,
            },
            headerTitle: () => null,
            headerRight: () => null,
            headerLeft: () => <Button title="Lullabed" />,
            headerShadowVisible: false,
          })}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Diagnostic"
          options={() => ({
            headerStyle: {
              backgroundColor: colorsSchema.background,
            },
            headerTitle: () => null,
            headerLeft: () => null,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
          })}
          component={DiagnosticScreen}
        />
        <Stack.Screen
          name="Contacts"
          options={({ navigation }) => ({
            headerTitle: () => null,
            headerStyle: {
              backgroundColor: colorsSchema.background,
            },
            headerLeft: () => (
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
          })}
          component={ContactsScreen}
        />
        <Stack.Screen
          name="Settings"
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: colorsSchema.background,
            },
            headerTitle: () => null,
            headerLeft: () => (
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
            headerStatusBarHeight: 44,
            headerShadowVisible: false,
          })}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
