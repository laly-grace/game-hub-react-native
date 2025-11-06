import { Image } from "expo-image";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import DropdownComponent from "@/components/DropdownComponent";
import GameCard from "@/components/GameCard";
import { router } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import GameModal from "@/components/GenreModal";
import { useState } from "react";
import GameScroll from "@/components/GameScroll";
import GameFilter from "@/components/GameFilter";
import useGameStore from "@/store";

export default function Home() {
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const setIsModalVisible = useGameStore((s) => s.setIsModalVisible);
  const isModalVisible = useGameStore((s) => s.isModalVisible);

  const selectedGenre = useGameStore((s) => s.selectedGenre);
  const selectedPlatform = useGameStore((s) => s.selectedPlatform);

  return (
    <View style={styles.container}>
      <View className="p-1">
        <Text className="text-4xl font-bold text-purple-100">
          {selectedGenre != null || selectedPlatform != null ? (
            <Text style={{ textTransform: "capitalize" }}>
              {selectedGenre?.name} {selectedPlatform?.name} Games
            </Text>
          ) : (
            <>New and trending</>
          )}
        </Text>
        <Text className="text-sm text-white">
          Based on player counts and release date
        </Text>
      </View>
      <View>
        <GameFilter />
      </View>
      <Pressable
        onPress={() => setIsModalVisible(!isModalVisible)}
        style={styles.modalOpen}
        className="w-40 h-[30]  font-bold py-2 px-4 rounded-full flex-row ml-1 mb-4"
      >
        <Icon name={isModalVisible ? "chevron-up" : "chevron-down"} size={20} />
        <Text className="font-semibold text-base text-white">
          Filter By Genres
        </Text>
      </Pressable>
      <GameModal isVisible={isModalVisible} onClose={onModalClose} />

      <GameScroll />
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
  modalOpen: {
    backgroundColor: "gray",
  },
});
