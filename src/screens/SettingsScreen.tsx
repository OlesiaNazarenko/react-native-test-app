import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { MainParamList } from "../components/navigationStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useThemeCustom } from "../utils/ThemeProvider";

type DiagnosticViewProps = {
  navigation: StackNavigationProp<MainParamList, "Diagnostic">;
};

export const SettingsScreen = ({ navigation }: DiagnosticViewProps) => {
  const { colorsSchema } = useThemeCustom();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colorsSchema.background }}
    >
      <Text style={styles.h1}>Settings</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 170,
  },
  h1: {
    fontSize: 40,
    marginBottom: 40,
    display: "flex",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  baseText: {
    marginBottom: 10,
  },
});
