import NormalMovieCards from "@/components/Cards/NormalMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { getTrendingMovies, searchMovies } from "@/services/api";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: movies,
    loading,
    error,
    refetch,
  } = useFetch<Movie[] | NewTrendingMovie[]>({
    fetchFunction: () =>
      searchQuery ? searchMovies(searchQuery, page) : getTrendingMovies(page),
    autoFetch: true,
  });

  // Debounce search query
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);

      refetch();
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearch = () => {
    refetch();
  };

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0 top-0" />

      <Image source={icons.logo} className="w-12 mx-auto mt-20 mb-5 h-10" />

      <View className="flex-row items-center justify-between bg-dark-200 px-5 py-4 mx-[20px] rounded-full shadow-md mt-5">
        <TextInput
          className="flex-1 text-white"
          placeholder="Search for movies..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={handleChangeText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus={true}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image source={icons.search} className="size-5" tintColor="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 20,
        }}
        className="w-full"
        data={movies as Movie[] & NewTrendingMovie[]}
        numColumns={3}
        renderItem={({ item }) => (
          <NormalMovieCards
            key={item?.id}
            id={item?.id}
            imageUrl={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
            title={item?.title}
            genres={"Movie"}
            vote_average={item?.vote_average}
            duration="2h 30m"
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center w-full p-4">
            <Text className="text-white text-lg">
              {loading
                ? "Searching movies..."
                : searchQuery
                ? "No movies found"
                : "Search for a movie"}
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="mb-4 mt-5">
            {debouncedQuery && !loading && movies && movies.length > 0 && (
              <Text className="text-white text-lg font-semibold">
                Search results for "{debouncedQuery}"
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
