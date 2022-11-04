import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { firebase, db } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  const { id, chatName } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            size={30}
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "http://www.bigleaf.net/wp-content/uploads/2017/10/avatar-placeholder.png",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            {chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 66,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={21} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={19} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    db.collection("chats").doc(id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      photoURL: firebase.auth().currentUser.photoURL,
    });

    setInput("");
  };

  useEffect(() => {
    const unSubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unSubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages?.map(({ id, data }) =>
                data.email === firebase.auth().currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      rounded
                      position="absolute"
                      size={28}
                      bottom={-10}
                      right={-5}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      size={28}
                      bottom={-10}
                      left={-5}
                      source={{
                        uri: data.photoURL,
                      }}
                    />

                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                value={input}
                style={styles.textInput}
                onChangeText={(e) => setInput(e)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons
                  name="send"
                  size={24}
                  color="skyblue"
                  style={{ marginBottom: 9 }}
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    borderColor: "transparent",
    color: "grey",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#ECECEC",
    marginRight: 10,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    color: "white",
    left: 10,
    paddingRight: 10,
    fontSize: 10,
  },
});
