import React, { useContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationStack } from "./src/components/navigationStack";
import { ThemeProvider, useThemeCustom } from "./src/utils/ThemeProvider";
export default function App() {
  const { colorsSchema } = useThemeCustom();

  return (
    <ThemeProvider>
      <SafeAreaProvider
        style={{
          backgroundColor: colorsSchema.background,
          paddingHorizontal: 24,
        }}
      >
        <NavigationStack />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
