import useFetch from "@/hooks/useFetch";
import { getLatestMovies } from "@/services/api";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import NormalMovieCards from "../Cards/NormalMovieCard";

const LatestMovies = () => {
  const { data: latest, loading } = useFetch({
    fetchFunction: () => getLatestMovies(1),
    autoFetch: true,
  });

  return (
    <View className="mt-[50px] mb-[100px]">
      <Text className="mb-[14px] text-4xl font-bold text-white ml-[20px]">
        Latest movies
      </Text>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        className="w-full"
        data={latest}
        numColumns={3}
        renderItem={({ item }) => (
          <NormalMovieCards
            key={item?.id}
            id={item?.id}
            imageUrl={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
            title={item?.title}
            genres={"Action, Drama"}
            vote_average={item?.vote_average}
            duration="2h 30m"
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center w-full p-4">
            <Text className="text-white text-lg">
              {loading ? "Loading movies..." : "No movies found"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default LatestMovies;

const styles = StyleSheet.create({});
