import React, { useEffect, useRef } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DropdownComponent from "@/components/DropdownComponent";
import GameCard from "@/components/GameCard";
import SectionHeader from "@/components/SectionHeader";
import { router } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import GameModal from "@/components/GenreModal";
import { useState } from "react";
import GameScroll from "@/components/GameScroll";
import GameFilter from "@/components/GameFilter";
import useGameStore from "@/store";

export default function Home() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fade]);
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
      {/* gradient background layer */}
      <LinearGradient
        colors={["#07070a", "#0b1220"]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [
              {
                translateY: fade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 0],
                }),
              },
            ],
          },
        ]}
      >
        <SectionHeader />

        <View>
          <GameFilter />
        </View>

        <Pressable
          onPress={() => setIsModalVisible(!isModalVisible)}
          style={styles.modalOpen}
        >
          <Icon
            name={isModalVisible ? "chevron-up" : "chevron-down"}
            size={18}
            color="#fff"
          />
          <Text style={styles.filterText}>Filter By Genres</Text>
        </Pressable>

        <GameModal isVisible={isModalVisible} onClose={onModalClose} />

        <GameScroll />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 6,
    // alignItems: "center",
    // justifyContent: "center",
  },
  modalOpen: {
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  heading: {},
  subheading: {},
  filterText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
