import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";

const GeoCalc = () => {
  const [distanceCalc, setDistance] = useState("");
  const [bearingCalc, setBearing] = useState("");
  const [latPoint1State, getLatPoint1] = useState({
    latPoint1: "",
    errorStatus: true,
  });
  const [longPoint1State, getLongPoint1] = useState({
    longPoint1: "",
    errorStatus: true,
  });
  const [longPoint2State, getLongPoint2] = useState({
    longPoint2: "",
    errorStatus: true,
  });
  const [latPoint2State, getLatPoint2] = useState({
    latPoint2: "",
    errorStatus: true,
  });

  const getLatPoint1InputHandler = (enteredLat1) => {
    if (!isNaN(enteredLat1.latPoint1) && enteredLat1.latPoint1 != "") {
      getLatPoint1({
        ...latPoint1State,
        errorStatus: true,
        ...enteredLat1,
      });
    } else {
      getLatPoint1({
        ...latPoint1State,
        errorStatus: false,
        ...enteredLat1,
      });
    }
  };
  const getLongPoint1InputHandler = (enteredLong1) => {
    if (!isNaN(enteredLong1.longPoint1) && enteredLong1.longPoint1 != "") {
      getLongPoint1({
        ...longPoint1State,
        errorStatus: true,
        ...enteredLong1,
      });
    } else {
      getLongPoint1({
        ...longPoint1State,
        errorStatus: false,
        ...enteredLong1,
      });
    }
  };
  const getLatPoint2InputHandler = (enteredLat2) => {
    if (!isNaN(enteredLat2.latPoint2) && enteredLat2.latPoint2 != "") {
      getLatPoint2({
        ...latPoint2State,
        errorStatus: true,
        ...enteredLat2,
      });
    } else {
      getLatPoint2({
        ...latPoint2State,
        errorStatus: false,
        ...enteredLat2,
      });
    }
  };
  const getLongPoint2InputHandler = (enteredLong2) => {
    if (!isNaN(enteredLong2.longPoint2) && enteredLong2.longPoint2 != "") {
      getLongPoint2({
        ...longPoint2State,
        errorStatus: true,
        ...enteredLong2,
      });
    } else {
      getLongPoint2({
        ...longPoint2State,
        errorStatus: false,
        ...enteredLong2,
      });
    }
  };

  const setDistanceInputHandler = () => {
    if (
      !isNaN(latPoint1State.latPoint1) &&
      latPoint1State.latPoint1 != "" &&
      !isNaN(latPoint2State.latPoint2) &&
      latPoint2State.latPoint2 != "" &&
      !isNaN(longPoint1State.longPoint1) &&
      longPoint1State.longPoint1 != "" &&
      !isNaN(longPoint2State.longPoint2) &&
      longPoint2State.longPoint2 != ""
    ) {
      let distance = computeDistance(
        latPoint1State.latPoint1,
        longPoint1State.longPoint1,
        latPoint2State.latPoint2,
        longPoint2State.longPoint2
      );
      setBearingInputHandler();
      setDistance(distance);
      console.log("Still calc");
    } else {
      console.log("not calculation");
    }
  };

  const setBearingInputHandler = () => {
    let bearing = computeBearing(
      latPoint1State.latPoint1,
      longPoint1State.longPoint1,
      latPoint2State.latPoint2,
      longPoint2State.longPoint2
    );
    setBearing(bearing);
  };

  const clearState = () => {
    setDistance("");
    setBearing("");
    getLatPoint1({ latPoint1: "", errorStatus: true });
    getLongPoint1({ longPoint1: "", errorStatus: true });
    getLatPoint2({ latPoint2: "", errorStatus: true });
    getLongPoint2({ longPoint2: "", errorStatus: true });
  };

  // Converts from degrees to radians.
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Converts from radians to degrees.
  function toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  // Computes distance between two geo coordinates in kilometers.
  function computeDistance(lat1, lon1, lat2, lon2) {
    console.log(`p1={${lat1},${lon1}} p2={${lat2},${lon2}}`);
    //  var R = 6371; // km (change this constant to get miles)
    var R = 3958.756;
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return `Distance: ${round(d, 3)} mi`;
  }

  // Computes bearing between two geo coordinates in degrees.
  function computeBearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    var brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    brng = (brng + 360) % 360;
    return `Bearing: ${round(brng, 3)} degrees`;
  }
  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  return (
    <View>
      <TextInput
        // keyboardType="numeric"
        placeholder={"Enter latitude for point 1"}
        style={styles.inputStyle}
        onChangeText={(enteredLat1) =>
          getLatPoint1InputHandler({ latPoint1: enteredLat1 })
        }
        value={latPoint1State.latPoint1}
      />
      {latPoint1State.errorStatus == false ? (
        <Text style={styles.errorMessage}>* Must be a number.</Text>
      ) : null}
      <TextInput
        placeholder={"Enter longitude for point 1"}
        style={styles.inputStyle}
        onChangeText={(enteredLong1) =>
          getLongPoint1InputHandler({ longPoint1: enteredLong1 })
        }
        value={longPoint1State.longPoint1}
      />
      {longPoint1State.errorStatus == false ? (
        <Text style={styles.errorMessage}>* Must be a number.</Text>
      ) : null}
      <TextInput
        placeholder={"Enter latitude for point 2"}
        style={styles.inputStyle}
        onChangeText={(enteredLat2) =>
          getLatPoint2InputHandler({ latPoint2: enteredLat2 })
        }
        value={latPoint2State.latPoint2}
      />
      {latPoint2State.errorStatus == false ? (
        <Text style={styles.errorMessage}>* Must be a number.</Text>
      ) : null}
      <TextInput
        placeholder={"Enter longitude for point 2"}
        style={styles.inputStyle}
        onChangeText={(enteredLong2) =>
          getLongPoint2InputHandler({ longPoint2: enteredLong2 })
        }
        value={longPoint2State.longPoint2}
      />
      {longPoint2State.errorStatus == false ? (
        <Text style={styles.errorMessage}>* Must be a number.</Text>
      ) : null}
      <View style={styles.calcButton}>
        <Button title={"Calculate"} onPress={setDistanceInputHandler} />
      </View>
      <View style={styles.clearButton}>
        <Button title={"Clear"} onPress={clearState} />
      </View>
      <View style={styles.bearingValue}>
        <Text>{`${distanceCalc}`}</Text>
        <Text>{`${bearingCalc}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /*  backgroundColor: "dodgerblue",
  flex: 0.5, */
  },
  calcButton: {
    width: "100%",
    height: 100,
    paddingTop: 20,
  },
  clearButton: {
    width: "100%",
    height: 50,
  },

  bearingValue: {
    top: 10,
    left: -15,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    height: 40,
    fontSize: 15,
    //fontWeight: "bold",
  },

  errorMessage: {
    fontSize: 15,
    color: "red",
    marginLeft: -20,
  },
});

export default GeoCalc;
