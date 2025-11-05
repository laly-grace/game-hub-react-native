import { Image } from "expo-image";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import DropdownComponent from "@/components/DropdownComponent";
import GameCard from "@/components/GameCard";
import { router } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import GameModal from "@/components/GenreModal";
import { useState } from "react";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View className="p-1">
        <Text className="text-4xl font-bold text-purple-100">
          New and Trending
        </Text>
        <Text className="text-sm text-white">
          Based on player counts and release date
        </Text>
      </View>
      <View className="flex-row  ">
        <DropdownComponent />
        <DropdownComponent />
      </View>
      <Pressable
        onPress={() => setIsModalVisible(!isModalVisible)}
        className="w-40 h-[30] bg-purple-100 text-white font-bold py-2 px-4 rounded-full flex-row mb-4"
      >
        <Icon name={isModalVisible ? "chevron-up" : "chevron-down"} size={20} />
        <Text className="font-semibold text-base">Filter By Genres</Text>
      </Pressable>
      <GameModal isVisible={isModalVisible} onClose={onModalClose} />

      <ScrollView
        contentContainerStyle={{ gap: 15, paddingHorizontal: 5, marginTop: 5 }}
      >
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121013",
    padding: 3,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
