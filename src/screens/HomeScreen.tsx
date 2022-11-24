import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { MainParamList } from "../components/navigationStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useThemeCustom } from "../utils/ThemeProvider";

type DiagnosticViewProps = {
  navigation: StackNavigationProp<MainParamList, "Diagnostic">;
};

export const HomeScreen = ({ navigation }: DiagnosticViewProps) => {
  const { colorsSchema } = useThemeCustom();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome</Text>
      <Text style={styles.baseText}>
        I am your guide, let me introduce you the LullaBedTM approach what is
        based on uniqueness of the lullaby effect, setting it apart from
        meditation or any other music guided relaxation program.{" "}
      </Text>
      <Text style={styles.baseText}>
        To fully individualize the LullaBedTM App, you need to get through six
        diagnostic steps, and we`ll immediately create your personal lullaby to
        give you back your balance.
      </Text>
      <TouchableOpacity
        style={{ ...styles.buttons, backgroundColor: colorsSchema.secondary }}
        onPress={() => navigation.navigate("Diagnostic")}
      >
        <Text>Let's start!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    alignItems: "center",
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
  buttons: {
    borderRadius: 40,
    display: "flex",
    padding: 20,
    marginVertical: 20,
    width: 312,
    height: 56,
    alignItems: "center",
  },
});
