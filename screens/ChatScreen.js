import React, { useCallback, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(
      collectionRef,
      (ref) => ref.orderBy("createdAt", "desc") // Order messages by createdAt in descending order
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  // Function to handle new messages
  const handleSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, text, user } = messages[0];
    const createdAt = serverTimestamp();

    addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: auth?.currentUser?.uid,
          name: auth?.currentUser?.email,
        }}
      />
    </View>
  );
}
