import { View, Image, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { firebase } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    const unSubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return unSubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://tse2.mm.bing.net/th?id=OIP.ksI_h4hKsLw02Pl_3IMdawHaHa&pid=Api&P=0",
        }}
        style={styles.signalImage}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <Input
          placeholder="Password"
          autoFocus
          type="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <Button
        title="Login"
        onPress={handleSignIn}
        containerStyle={styles.button}
      />
      <Button
        title="Register"
        type="outline"
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
      />
      <View style={{ height: 50 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  signalImage: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});
