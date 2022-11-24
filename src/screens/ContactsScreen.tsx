import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useThemeCustom } from "../utils/ThemeProvider";

export const ContactsScreen = () => {
  const { colorsSchema } = useThemeCustom();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colorsSchema.background }}
    >
      <Text>Contacts</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
