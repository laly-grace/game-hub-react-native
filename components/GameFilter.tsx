import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropdownComponent from "./DropdownComponent";
import usePlatforms from "@/hooks/usePlatforms";

const GameFilter = () => {
  const { data } = usePlatforms();
  const sortBy = [
    { label: "Relevance", value: "" },
    { label: "Date added", value: "added" },
    { label: "Name", value: "name" },
    { label: "Release Date", value: "released" },
    { label: "Popularity", value: "metacritic" },
    { label: "Average Rating", value: "rating" },
  ];
  return (
    <View className="flex-row">
      <DropdownComponent otherData={sortBy} />
      <DropdownComponent platforms={data?.results} />
    </View>
  );
};

export default GameFilter;

const styles = StyleSheet.create({});
