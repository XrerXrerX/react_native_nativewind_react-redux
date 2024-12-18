/** @format */
import { useState } from "react";

import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../../lib/states/authUser/action";
import { AppDispatch } from "../../lib/states/store"; // Import the dispatch type
import { Link, useRouter } from "expo-router";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>(); // Explicitly type dispatch
  const router = useRouter();

  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onLogin = async () => {
    setSubmitting(true);
    try {
      const returnData = await dispatch(
        asyncSetAuthUser({
          username: form.username,
          password: form.password,
        })
      );

      if (returnData === "Failed") {
        Alert.alert("Login Failed", "Please try again.");
      } else {
        Alert.alert("Success", "Login Success!.");
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const submit = () => {
    const { username, password } = form;

    if (!username || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    onLogin();
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.username}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
