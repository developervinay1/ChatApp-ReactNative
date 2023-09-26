import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { ArrowRightOnRectangleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HomeScreen() {
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          error,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              style: "default",
            },
          ],
          { cancelable: true }
        );
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Home</Text>
        <TouchableOpacity onPress={signOutUser}>
          <ArrowRightOnRectangleIcon color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 30, marginTop: "70%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={{
            borderWidth: 1,
            paddingVertical: 18,
            borderRadius: 10,
            backgroundColor: "#C70039",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: 700, color: "white" }}
          >
            Open Messages
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
