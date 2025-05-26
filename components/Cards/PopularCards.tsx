import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PopularCardsProps {
  imageUrl: string;
  title: string;
  genres: string;
  duration: string;
  id: number;
  index?: number;
}

const PopularCards = ({
  imageUrl,
  title,
  genres,
  duration,
  id,
  index = 0,
}: PopularCardsProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity>
        <View className="w-[133px]">
          <View className="w-full h-[167px] relative">
            <Image
              source={{
                uri: imageUrl,
              }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
            <View className="absolute -bottom-3 -left-6 w-full">
              <Text className="text-white font-medium mb-[6px] text-8xl">
                {Math.round(index + 1)}
              </Text>
            </View>
          </View>
          <View className="mt-[9px]">
            <Text className="text-white font-medium mb-[8px]" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-400 text-xs" numberOfLines={1}>
              {genres} • <Text>{duration}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default PopularCards;
