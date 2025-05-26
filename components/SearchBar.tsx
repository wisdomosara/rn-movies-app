import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({
  placeholder = "Search",
  onPress,
  onChangeText,
  value,
  onSubmitEditing,
}: {
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  onSubmitEditing?: () => void;
}) => {
  return (
    <View className="flex-row items-center justify-between bg-dark-200 px-5 py-4 rounded-full mx-[20px] shadow-md">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        className="text-base text-white flex-1 ml-2"
        placeholderTextColor="#A8B5DB"
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
