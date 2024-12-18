/** @format */
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Link, useRouter } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { asyncRegisterUser } from "../../lib/states/authUser/action";
import { AppDispatch } from "../../lib/states/store"; // Import the dispatch type

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [repassword, setRePassword] = useState<string>(""); // For re-enter password
  const [isSubmitting, setSubmitting] = useState(false);

  // Async register function
  const onRegister = async () => {
    setSubmitting(true);

    try {
      const data = await dispatch(
        asyncRegisterUser({
          username: form.username,
          email: form.email,
          password: form.password,
        })
      );

      if (data?.status === "Failed") {
        Alert.alert("Registration Failed", "Please try again.");
      } else {
        Alert.alert("Success", "Registration successful! Please log in.");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const submit = () => {
    // Submit function with validation
    const { username, email, password } = form;

    if (!username || !email || !password || !repassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== repassword) {
      Alert.alert(
        "Password Mismatch",
        "Password and re-entered password do not match."
      );
      return;
    }

    onRegister();
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
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(value) => setForm({ ...form, username: value })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(value) => setForm({ ...form, email: value })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm Password"
            placeholder="Re-enter your password"
            value={repassword}
            handleChangeText={setRePassword}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
