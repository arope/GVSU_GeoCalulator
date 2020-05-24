import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import GeoCalc from "./component/GeoCalc";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./component/SettingsScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GeoCalculator"
          component={GeoCalc}
          options={{
            title: "GVSU GEOCAL",
            headerTitleStyle: {
              fontSize: 20,
              // fontWeight: "bold",
              // fontStyle: "italic",
              fontFamily:
                Platform.OS === "android"
                  ? "sans-serif-medium"
                  : "Helvetica Neue",
              alignSelf: "center",
              marginLeft: 40,
            },
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerTitleStyle: {
              fontSize: 20,
              // fontWeight: "bold",
              // fontStyle: "italic",
              fontFamily:
                Platform.OS === "android"
                  ? "sans-serif-medium"
                  : "Helvetica Neue",
              alignSelf: "center",
            },
          }}
        />

        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}> */}
        {/* <GeoCalc /> */}
        {/* </SafeAreaView>
    </TouchableWithoutFeedback> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // width: "80%",
    //  top: 50,
    // left: 40,
  },
});
