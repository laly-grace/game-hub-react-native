import { Image } from "expo-image";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DropdownComponent from "@/components/DropdownComponent";
import GameCard from "@/components/GameCard";

export default function Home() {
  return (
    <View style={styles.container}>
      <View className="p-1">
        <Text className="text-4xl font-bold">New and Trending</Text>
        <Text className="text-sm">Based on player counts and release date</Text>
      </View>
      <View className="flex-row  ">
        <DropdownComponent />
        <DropdownComponent />
      </View>
      <ScrollView contentContainerStyle={{ gap: 15, paddingHorizontal: 5 }}>
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
    backgroundColor: "#FCF9EA",
    padding: 3,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
