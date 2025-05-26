import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface NormalMovieCardsProps {
  imageUrl: string;
  title: string;
  genres: string;
  duration: string;
  id: number;
  vote_average: number;
}

const NormalMovieCards = ({
  imageUrl,
  title,
  genres,
  duration,
  id,
  vote_average,
}: NormalMovieCardsProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <View className="w-full overflow-hidden">
          <View className="w-full h-[167px] relative">
            <Image
              source={{
                uri: imageUrl,
              }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="mt-[9px]">
            <Text className="text-white font-medium mb-[6px]" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex-row items-center mb-[4px]">
              <Image
                source={icons.star}
                className="size-5 mr-1"
                resizeMode="contain"
                tintColor="#FFCC00"
              />

              <Text className="text-white font-medium">
                {Math.round(vote_average)}
              </Text>
            </View>
            <Text className="text-gray-400 text-xs" numberOfLines={1}>
              {genres} • <Text>{duration}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default NormalMovieCards;
