import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useThemeCustom } from "../utils/ThemeProvider";
// import { getToken } from "../service/api/spotifyToken";
// import authHandler from "../service/api/authHandler";

const DiagnosticStack = createStackNavigator<DiagnosticParamList>();

export type DiagnosticParamList = {
  First: undefined;
  Second: undefined;
  Third: undefined;
};

export const DiagnosticScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { colorsSchema } = useThemeCustom();

  const getData = () => {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then((response) => response.json())
      .then((res) => {
        setData(res.movies);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const buttonData: { label: String }[] = [
    { label: "Stress" },
    { label: "Malice" },
    { label: "Depression" },
    { label: "Sorrow" },
  ];

  type FirstViewProps = {
    navigation: StackNavigationProp<DiagnosticParamList, "First">;
  };
  type SecondViewProps = {
    navigation: StackNavigationProp<DiagnosticParamList, "Second">;
  };

  const FirstView = ({ navigation }: FirstViewProps) => {
    return (
      <View style={styles.buttonsContainer}>
        <Text style={{ color: colorsSchema.text, fontSize: 32 }}>
          Choose the symptom you want to work with:
        </Text>
        <View>
          {buttonData.map((button, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Second");
              }}
              key={index}
              style={{
                ...styles.buttons,
                backgroundColor: colorsSchema.secondary,
              }}
            >
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const SecondView = ({ navigation }: SecondViewProps) => (
    <View style={styles.buttonsContainer}>
      <Text>Second step</Text>
      <Button
        onPress={() => {
          navigation.navigate("Third"), setIsLoading(true), getData();
        }}
        title={"Next"}
      />
    </View>
  );

  const ThirdView = ({ navigation }: FirstViewProps) =>
    isLoading ? (
      <ActivityIndicator size="large" />
    ) : (
      <View style={styles.buttonsContainer}>
        <Text>Congrats! Results:</Text>
        {data && (
          <View style={styles.resultView}>
            <Text>{`Title: ${data[0].title}`}</Text>
            <Text>{`Release year: ${data[0].releaseYear}`}</Text>
            <Text>{`Id: ${data[0].id}`}</Text>
          </View>
        )}
        <Button onPress={() => navigation.navigate("First")} title={"Next"} />
      </View>
    );

  const getDiagnosticStackOptions = (
    navigation: any,
    hasHeaderRight: boolean,
    hasHeaderLeft: boolean,
    headerRightScreen: String,
    headerLeftScteen: String
  ) => {
    return {
      cardStyle: { backgroundColor: colorsSchema.background },
      headerShadowVisible: false,
      headerTitle: () => null,
      headerStyle: {
        backgroundColor: colorsSchema.background,
      },
      headerRight: () =>
        hasHeaderRight ? (
          <Ionicons
            name="ios-settings"
            size={25}
            color="black"
            onPress={() => navigation.navigate(headerRightScreen)}
          />
        ) : null,
      headerLeft: () =>
        hasHeaderLeft ? (
          <Ionicons
            name="ios-arrow-back"
            size={25}
            color="black"
            onPress={() => navigation.navigate(headerLeftScteen)}
          />
        ) : null,
    };
  };

  return (
    <DiagnosticStack.Navigator>
      <DiagnosticStack.Screen
        name="First"
        component={FirstView}
        options={({ navigation }) =>
          getDiagnosticStackOptions(navigation, true, true, "Settings", "Home")
        }
      />
      <DiagnosticStack.Screen
        name="Second"
        component={SecondView}
        options={({ navigation }) =>
          getDiagnosticStackOptions(navigation, true, true, "Settings", "Home")
        }
      />
      <DiagnosticStack.Screen
        name="Third"
        component={ThirdView}
        options={({ navigation }) =>
          getDiagnosticStackOptions(navigation, true, false, "Settings", "")
        }
      />
    </DiagnosticStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
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
  buttonText: { fontSize: 16 },
  buttons: {
    borderRadius: 40,
    display: "flex",
    padding: 20,
    marginVertical: 20,
    width: 312,
    height: 56,
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resultView: {
    padding: 20,
  },
});
