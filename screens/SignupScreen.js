import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    if (email === "" || password === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to continue",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Ok",
            style: "default",
          },
        ]
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          Alert.alert(
            "Account Created",
            "Your account has been created successfully",
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
          navigation.replace("Login");
        })
        .catch((error) => {
          Alert.alert("Error", error, [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              style: "default",
            },
          ]);
          // ..
        });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 250 }}>
        <Text
          style={{
            color: "#C70039",
            fontSize: 25,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Create an account
        </Text>
      </View>
      <View
        style={{
          borderWidth: 2,
          marginHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 10,
          paddingHorizontal: 15,
          borderColor: "gray",
          marginTop: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor={"#141E46"}
          style={{ color: "#141E46" }}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View
        style={{
          borderWidth: 2,
          marginHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 10,
          paddingHorizontal: 15,
          borderColor: "gray",
          marginTop: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={"#141E46"}
          style={{ color: "#141E46" }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity
          onPress={registerUser}
          style={{
            backgroundColor: "#C70039",
            paddingVertical: 18,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 18 }}>
          Already have an account ?
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
