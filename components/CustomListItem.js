import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { firebase, db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unSubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return unSubscribe;
  }, []);

  console.log("chatMessages", chatMessages);

  return (
    <TouchableOpacity
      style={styles.container}
      key={id}
      onPress={() => enterChat(id, chatName)}
      activeOpacity={0.8}
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "http://www.bigleaf.net/wp-content/uploads/2017/10/avatar-placeholder.png",
        }}
      />
      <View style={styles.chatDetail}>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
          <ListItem.Subtitle
            style={styles.subtitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </View>
    </TouchableOpacity>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e4e2",
    marginTop: 1,
  },
  chatDetail: {
    marginLeft: 15,
  },
  title: {
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 12,
  },
});
