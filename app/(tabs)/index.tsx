import NormalMovieCards from "@/components/Cards/NormalMovieCard";
import PopularMovies from "@/components/HomePageComponents/PopularMovies";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { getLatestMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";

import { memo } from "react";

const MovieHeader = memo(() => {
  const router = useRouter();
  return (
    <View>
      <Image source={icons.logo} className="w-12 mx-auto mt-20 mb-5 h-10" />
      <View className="flex-1 mt-5">
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search"
        />
      </View>
      <PopularMovies />
      <View className="mt-[50px]">
        <Text className="mb-[14px] text-4xl font-bold text-white ml-[20px]">
          Latest movies
        </Text>
      </View>
    </View>
  );
});

export default function MoviePage() {
  const { data: latest, loading } = useFetch({
    fetchFunction: () => getLatestMovies(1),
    autoFetch: true,
  });

  const { data: popularMovies } = useFetch({
    fetchFunction: () => getLatestMovies(1),
    autoFetch: true,
  });
  return (
    <View className="items-center justify-center flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0 top-0" />
      <FlatList
        className="w-full h-full"
        ListHeaderComponent={MovieHeader}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 20,
          paddingHorizontal: 20,
        }}
        contentContainerClassName="pb-[100px]"
        showsVerticalScrollIndicator={false}
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
}
