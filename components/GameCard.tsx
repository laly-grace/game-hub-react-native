import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const GameCard = () => {
  return (
    <TouchableOpacity>
      <View className="rounded-3xl overflow-hidden shadow-lg w-full ">
        <ImageBackground
          source={{ uri: "https://picsum.photos/400/300" }}
          className="w-full"
          imageStyle={{ resizeMode: "cover" }}
          style={{ height: 300, width: "100%" }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="p-3">
              <Text className="text-xs text-white/90">07th July 1997</Text>
              <View className="flex-row">
                <Icon name="microsoft-windows" size={20} color={"white"} />
                <Icon name="sony-playstation" size={20} color={"white"} />
                <Icon name="apple-ios" size={20} color={"white"} />
                <Icon name="microsoft-xbox" size={20} color={"white"} />
                <Icon name="android" size={20} color={"white"} />
              </View>
              <TouchableOpacity>
                <Text className="mt-1 text-2xl font-bold text-white">
                  Prince of Persia: The Sands of Time Remake{" "}
                </Text>
              </TouchableOpacity>
              {/* <Text className="mt-2 text-sm leading-5 text-white/95">
                Deep in the vastness of space lies a story untold—of strange
                beings, otherworldly landscapes, and encounters that defy
              </Text> */}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
