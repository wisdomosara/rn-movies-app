import { Stack } from "expo-router";
import { View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",

          presentation: "modal",
          contentStyle: { backgroundColor: "#121212" }, // Match your bg-primary color
        }}
      >
        {/* <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      </Stack>
    </View>
  );
}
