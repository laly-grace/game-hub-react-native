import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Game } from "@/hooks/useGames";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <TouchableOpacity>
      <View className="rounded-3xl overflow-hidden shadow-lg w-full ">
        <View style={{ height: 250, width: "100%" }}>
          <Image
            source={{ uri: game.background_image }}
            style={{
              position: "absolute",
              inset: 0,
              height: 250,
              width: "100%",
            }}
            contentFit="cover"
            cachePolicy="disk"
            transition={200}
            placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
          />
          <View
            className="flex-1 bg-black/50 justify-end"
            style={{ height: "100%" }}
          >
            <View className="p-3">
              <Text className="text-xs text-white/90">
                {game.released
                  ? new Date(game.released).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "Unknown Date"}
              </Text>
              <View className="flex-row">
                <Icon name="microsoft-windows" size={20} color={"white"} />
                <Icon name="sony-playstation" size={20} color={"white"} />
                <Icon name="apple-ios" size={20} color={"white"} />
                <Icon name="microsoft-xbox" size={20} color={"white"} />
                <Icon name="android" size={20} color={"white"} />
              </View>
              <TouchableOpacity>
                <Text className="mt-1 text-2xl font-bold text-white">
                  {game.name}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
