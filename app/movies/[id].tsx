import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import { getMovieById } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const MoviePage = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch({
    fetchFunction: () => getMovieById(Number(id)),
    autoFetch: true,
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Loading movie details...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">
          {error?.message || "Movie not found"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-dark-200">
      <View className="relative">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              movie?.backdrop_path || movie?.poster_path
            }`,
          }}
          className="w-full h-[447px]"
          resizeMode="cover"
        />
      </View>

      <View className="p-[20px]">
        <Text className="text-white text-2xl font-bold">{movie?.title}</Text>
        {movie?.tagline && (
          <Text className="text-gray-300 italic">{movie?.tagline}</Text>
        )}

        <View className="flex-row items-center mb-4 mt-4">
          <View className="bg-gray-800 rounded-md px-2 py-1 mr-2">
            <Text className="text-white text-xs">
              {movie?.release_date?.substring(0, 4)}
            </Text>
          </View>
          <View className="bg-gray-800 rounded-md px-2 py-1 mr-2">
            <Text className="text-white text-xs">PG-13</Text>
          </View>
          <View className="bg-gray-800 rounded-md px-2 py-1">
            <Text className="text-white text-xs">{movie?.runtime} min</Text>
          </View>
        </View>

        <View className="flex-row items-center mb-4">
          <Image
            source={icons.star}
            className="size-5 mr-1"
            resizeMode="contain"
            tintColor="#FFCC00"
          />
          <Text className="text-white mr-4">
            {movie?.vote_average?.toFixed(1)} ({movie?.vote_count} votes)
          </Text>
        </View>

        <View className="flex-row flex-wrap mb-4">
          {movie?.genres?.map((genre) => (
            <View
              key={genre?.id}
              className="bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2"
            >
              <Text className="text-white">{genre?.name}</Text>
            </View>
          ))}
        </View>

        <View className="mb-4">
          <Text className="text-white text-lg font-bold mb-2">Overview</Text>
          <Text className="text-gray-300 text-medium leading-[24px]">
            {movie?.overview}
          </Text>
        </View>

        {movie?.production_companies?.length > 0 && (
          <View className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">
              Production
            </Text>
            <Text className="text-gray-300 text-medium leading-[24px]">
              {movie?.production_companies
                ?.map((company) => company?.name)
                ?.join(", ")}
            </Text>
          </View>
        )}

        <View className="mb-4">
          <Text className="text-white text-lg font-bold mb-2">Status</Text>
          <Text className="text-gray-300 text-medium leading-[24px]">
            {movie?.status}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-white text-lg font-bold mb-2">Budget</Text>
          <Text className="text-gray-300 text-medium leading-[24px]">
            ${(movie?.budget / 1000000)?.toFixed(1)} Million
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-white text-lg font-bold mb-2">Revenue</Text>
          <Text className="text-gray-300 text-medium leading-[24px]">
            ${(movie?.revenue / 1000000)?.toFixed(1)} Million
          </Text>
        </View>

        {movie?.original_language && (
          <View className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">
              Original Language
            </Text>
            <Text className="text-gray-300 text-medium leading-[24px]">
              {movie?.original_language?.toUpperCase()}
            </Text>
          </View>
        )}

        {movie?.popularity && (
          <View className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">
              Popularity
            </Text>
            <Text className="text-gray-300 text-medium leading-[24px]">
              {movie?.popularity?.toFixed(1)}
            </Text>
          </View>
        )}

        {movie?.production_countries &&
          movie?.production_countries?.length > 0 && (
            <View className="mb-4">
              <Text className="text-white text-lg font-bold mb-2">
                Production Countries
              </Text>
              <Text className="text-gray-300 text-medium leading-[24px]">
                {movie?.production_countries
                  ?.map((country) => country?.name)
                  ?.join(", ")}
              </Text>
            </View>
          )}

        {movie?.spoken_languages && movie?.spoken_languages?.length > 0 && (
          <View className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">
              Spoken Languages
            </Text>
            <Text className="text-gray-300 text-medium leading-[24px]">
              {movie?.spoken_languages
                ?.map((language) => language?.english_name)
                ?.join(", ")}
            </Text>
          </View>
        )}

        {movie?.homepage && (
          <View className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">Website</Text>
            <Text className="text-blue-400 text-medium leading-[24px]">
              {movie?.homepage}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MoviePage;

const styles = StyleSheet.create({});
