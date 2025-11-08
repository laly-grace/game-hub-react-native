import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useGameStore from "@/store";
import { Ionicons } from "@expo/vector-icons";

interface SectionHeaderProps {
  titleOverride?: string;
  subtitleOverride?: string;
  compact?: boolean;
}

// Professional mobile section header with animated entrance, gradient accent bar, dynamic title derived from selected genre/platform
export default function SectionHeader({
  titleOverride,
  subtitleOverride,
  compact = false,
}: SectionHeaderProps) {
  const selectedGenre = useGameStore((s) => s.selectedGenre);
  const selectedPlatform = useGameStore((s) => s.selectedPlatform);

  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [anim, selectedGenre, selectedPlatform]);

  const baseTitle = (() => {
    if (titleOverride) return titleOverride;
    if (selectedGenre || selectedPlatform) {
      const g = selectedGenre?.name ? selectedGenre.name : "";
      const p = selectedPlatform?.name ? selectedPlatform.name : "";
      return `${g} ${p}`.trim() + " Games";
    }
    return "New & Trending";
  })();

  const subtitle =
    subtitleOverride || "Based on player counts and release date";

  return (
    <Animated.View
      style={[
        styles.container,
        compact && { paddingBottom: 4 },
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.row}>
        <Ionicons
          name={selectedPlatform ? "game-controller-outline" : "flame-outline"}
          size={18}
          color="#a5b4fc"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
          {baseTitle}
        </Text>
      </View>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  accentBar: {
    width: 6,
    height: 28,
    borderRadius: 4,
    marginRight: 10,
  },
  title: {
    flexShrink: 1,
    fontSize: 26,
    fontWeight: "700",
    color: "#e9d5ff",
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 4,
    marginLeft: 25,
    color: "#c7cfe2",
    fontSize: 13,
  },
});
