import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { firebase } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "http://www.bigleaf.net/wp-content/uploads/2017/10/avatar-placeholder.png",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.heading}>Create a Signal account</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="name"
          value={name}
          onChangeText={(e) => setName(e)}
        />
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
        <Input
          placeholder="Profile picture URL (optional)"
          autoFocus
          type="image"
          value={imageUrl}
          onSubmitEditing={handleRegister}
          onChangeText={(e) => setImageUrl(e)}
        />
      </View>
      <Button
        title="Register"
        onPress={handleRegister}
        containerStyle={styles.button}
      />
      <View style={{ height: 50 }}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});
