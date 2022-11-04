import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { firebase } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      // headerTitleAlign: "center",
      // headerLeft: () => (
      //   <View>
      //     <Text>Chats</Text>
      //   </View>
      // ),
      headerBackTitle: "Chats",
    });
  }, []);

  const createChat = async () => {
    await firebase
      .firestore()
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <Input
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {},
});
