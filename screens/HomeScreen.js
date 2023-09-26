import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChatBubbleOvalLeftIcon } from "react-native-heroicons/outline";

export default function HomeScreen() {
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
        <TouchableOpacity>
          <ChatBubbleOvalLeftIcon color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 30, marginTop: "70%" }}>
        <TouchableOpacity
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
