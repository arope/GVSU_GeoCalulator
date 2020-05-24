import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
        <Text>Cancel</Text>
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
        <Text>Save</Text>
      </TouchableOpacity>
    ),
  });

  return (
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
  );
};

const styles = StyleSheet.create({
  dropStyle: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default SettingsScreen;
