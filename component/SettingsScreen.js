import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";

const SettingsScreen = ({ navigation }) => {
  const distanceUnits = [{ value: "Kilometers" }, { value: "Miles" }];
  const bearingUnits = [{ value: "Degrees" }, { value: "Mils" }];
  const [distanceUnit, setDistanceUnit] = useState("");
  const [bearingUnit, setBearingUnit] = useState("");

  const getDistanceUnit = (enteredUnit) => {
    setDistanceUnit(enteredUnit);
  };

  const getBearingUnit = (enteredUnit) => {
    setBearingUnit(enteredUnit);
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("GeoCalculator")}>
        <Text style={{ marginRight: 10, color: "#fff" }}>Cancel</Text>
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("GeoCalculator", {
            distanceUnit,
            bearingUnit,
          });
        }}
      >
        <Text style={{ marginLeft: 10, color: "#fff" }}>Save</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: "#2276c0",
    },
    headerTintColor: "#fff",
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropStyle}>
        <Dropdown
          label={"Distance Units"}
          data={distanceUnits}
          onChangeText={getDistanceUnit}
          value={distanceUnit}
        />
        <Dropdown
          label={"Bearing Units"}
          data={bearingUnits}
          onChangeText={getBearingUnit}
          value={bearingUnit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0ecfd",
    alignSelf: "center",
    width: "100%",
  },

  dropStyle: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default SettingsScreen;
