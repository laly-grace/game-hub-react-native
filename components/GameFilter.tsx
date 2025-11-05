import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropdownComponent from "./DropdownComponent";
import usePlatforms from "@/hooks/usePlatforms";

const GameFilter = () => {
  const { data } = usePlatforms();
  const sortBy = [
    { label: "Relevance", value: "1" },
    { label: "Date Added", value: "2" },
    { label: "Name", value: "3" },
    { label: "Release Date", value: "4" },
    { label: "Popularity", value: "5" },
    { label: "Average Rating", value: "6" },
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
