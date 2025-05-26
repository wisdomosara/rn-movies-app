import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import {
  Image,
  ImageBackground,
  Text,
  useColorScheme,
  View,
} from "react-native";

const TabIcon = ({
  color,
  focused,
  title,
}: {
  color: string;
  focused: boolean;
  title: string;
}) => {
  return focused ? (
    <ImageBackground
      source={images.highlight}
      className={`flex flex-row w-full mt-[14px] gap-[5px] min-w-[112px] min-h-[51px] flex-1 justify-center items-center rounded-full overflow-hidden`}
    >
      <Image
        source={
          title === "Home"
            ? icons.home
            : title === "Profile"
            ? icons.person
            : title === "Saved"
            ? icons.save
            : icons.search
        }
        className="size-5"
        tintColor="#151312"
      />
      {focused && <Text className="text-sm font-bold">{title}</Text>}
    </ImageBackground>
  ) : (
    <View className="size-full flex-row items-center justify-center mt-4 rounded-full">
      <Image
        source={
          title === "Home"
            ? icons.home
            : title === "Profile"
            ? icons.person
            : title === "Saved"
            ? icons.save
            : icons.search
        }
        className="size-5"
        tintColor="#A8B5DB"
      />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          marginHorizontal: 20,
          marginBottom: 20,
          height: 52,
          position: "absolute",
          borderWidth: 1,
          borderColor: "0f0d23",
          borderRadius: 50,
          backgroundColor: "#0f0d23",

          // backgroundColor: isDark ? "#030014" : "#FFFFFF", // primary color for dark mode
        },
        // headerStyle: {
        //   backgroundColor: isDark ? "#030014" : "#FFFFFF",
        // },
        // headerTintColor: isDark ? "#FFFFFF" : "#030014",
        // tabBarLabelStyle: {
        //   fontWeight: "500",
        // },
        // tabBarInactiveTintColor: isDark ? "#9CA4AB" : "#151312", // light.300 or secondary

        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} title="Home" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} title="Profile" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} title="Saved" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} title="Search" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
