/** @format */

import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { icons } from "../../constants";
import { ThunkDispatch } from "redux-thunk"; // Import ThunkDispatch
import { RootState } from "../../types"; // Pastikan path-nya benar
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcessTemp } from "../../lib/states/isPreload/action.js"; // Ensure this is correct file

// Define the props for TabIcon with proper types
interface TabIconProps {
  icon: any; // You can replace `any` with `ImageSourcePropType` if using static images
  color: string;
  name: string;
  focused: boolean;
}

// Functional component for TabIcon
const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  const authUser = useSelector((state: RootState) => state.authUser);
  const isPreload = useSelector((state: RootState) => state.isPreload);

  const dispatch: ThunkDispatch<RootState, unknown, any> = useDispatch(); // Add ThunkDispatch type
  // useEffect(() => {
  //   // @TODO: dispatch async action to preload app
  //   dispatch(asyncPreloadProcess());
  // }, [dispatch]);
  useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asyncPreloadProcessTemp());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }
  if (authUser === null) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View className="flex items-center justify-center gap-2 w-20 my-auto">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

// TabsLayout component
const TabsLayout: React.FC = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001", //
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 58,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
