import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/themed";
import { firebase } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const photoURL = firebase?.auth()?.currentUser?.photoURL;
  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      });
  };

  useEffect(() => {
    const unSubscribe = firebase
      .firestore()
      .collection("chats")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unSubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: {
        backgroundColor: "white",
      },
      // headerTitleAlign: "center",
      headerTitleStyle: {
        color: "black",
      },
      headerTintColor: {
        color: "black",
      },
      headerLeft: () => (
        <View style={{ marginLeft: 4, marginRight: 18 }}>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar
              rounded
              size={30}
              source={{
                uri:
                  photoURL ||
                  "http://www.bigleaf.net/wp-content/uploads/2017/10/avatar-placeholder.png",
              }}
            />
          </TouchableOpacity>
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
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              name="pencil"
              size={21}
              color="black"
              onPress={() => navigation.navigate("AddChat")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            id={id}
            key={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
