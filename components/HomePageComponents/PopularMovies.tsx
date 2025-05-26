import useFetch from "@/hooks/useFetch";
import { getTrendingMovies } from "@/services/api";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PopularCards from "../Cards/PopularCards";

const PopularMovies = () => {
  const { data: popularMovies, loading } = useFetch({
    fetchFunction: () => getTrendingMovies(1),
    autoFetch: true,
  });

  return (
    <View className="mt-[30px] ">
      <Text className="mb-[14px] text-4xl font-bold text-white ml-[20px]">
        Popular movies
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
        className="flex-row"
        data={popularMovies}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item, index }) => (
          <PopularCards
            key={item?.id}
            id={item?.id}
            imageUrl={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
            title={item?.name || item?.title || ""}
            genres={item?.media_type}
            duration="2h 30m"
            index={index}
          />
        )}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center p-4">
            <Text className="text-white text-lg">
              {loading ? "Loading movies..." : "No movies found"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PopularMovies;

const styles = StyleSheet.create({});
