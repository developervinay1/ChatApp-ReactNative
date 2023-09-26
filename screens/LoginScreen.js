import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUserInfo = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setLoading(false);
      }
      if (currentUser) {
        navigation.replace("Home");
      }
    });
  }, []);

  const logInUser = () => {
    if (email === "" || password === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to continue.",
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
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          Alert.alert(
            "Login Success",
            "Your account has been logged in successfully.",
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

          navigation.replace("Home");
          // ...
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
            {
              cancelable: true,
            }
          );
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={"#C70039"} />
        </View>
      ) : (
        <View>
          <View style={{ marginTop: 250 }}>
            <Text
              style={{
                color: "#C70039",
                fontSize: 25,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Login to continue
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
              secureTextEntry
              autoCorrect={false}
              placeholder="Password"
              placeholderTextColor={"#141E46"}
              style={{ color: "#141E46" }}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <TouchableOpacity
              onPress={logInUser}
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
                Login
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
              Don't have an account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Register")}>
              <Text style={{ fontWeight: 700, fontSize: 18 }}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
