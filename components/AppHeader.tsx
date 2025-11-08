import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Animated,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import useGameStore from "../store";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppHeaderProps {
  title?: string;
  onSearch?(query: string): void;
  onToggleMenu?(): void;
  rightActionIcon?: string;
  onRightAction?(): void;
  showSearchInitially?: boolean;
}

export default function AppHeader({
  title = "Games",
  onSearch,
  onToggleMenu,
  rightActionIcon = "notifications-outline",
  onRightAction,
  showSearchInitially = false,
}: AppHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(showSearchInitially);
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput | null>(null);

  // Wire to global store
  const setSearchText = useGameStore((s) => s.setSearchText);

  const openAnim = useRef(
    new Animated.Value(showSearchInitially ? 1 : 0)
  ).current;
  const bgPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulse, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(bgPulse, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bgPulse]);

  const toggleSearch = () => {
    const to = searchOpen ? 0 : 1;
    setSearchOpen(!searchOpen);
    Animated.spring(openAnim, {
      toValue: to,
      useNativeDriver: false,
      bounciness: 12,
      speed: 12,
    }).start(() => {
      if (!searchOpen) {
        inputRef.current?.focus();
      }
    });
  };

  const handleSubmit = () => {
    const trimmed = query.trim();
    setSearchText(trimmed || undefined);
    if (onSearch) onSearch(trimmed);
  };

  // Debounce updates while typing for smoother filtering
  useEffect(() => {
    const trimmed = query.trim();
    const id = setTimeout(() => {
      setSearchText(trimmed || undefined);
    }, 250);
    return () => clearTimeout(id);
  }, [query, setSearchText]);

  const searchWidth = openAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const searchOpacity = openAnim.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 0.4, 1],
  });

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "black" }} />
      <View style={styles.container}>
        {/* Animated gradient + blur background layers */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <LinearGradient
            colors={["#0f172a", "#1e1b4b"]}
            start={[0, 0]}
            end={[1, 1]}
            style={StyleSheet.absoluteFill}
          />
          <Animated.View
            style={[
              styles.pulseLayer,
              {
                opacity: bgPulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.15, 0.35],
                }),
                transform: [
                  {
                    scale: bgPulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.08],
                    }),
                  },
                ],
              },
            ]}
          />
          <BlurView
            intensity={50}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={["rgba(255,255,255,0.04)", "rgba(0,0,0,0.2)"]}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={styles.leftCluster}>
          {onToggleMenu && (
            <Pressable
              onPress={onToggleMenu}
              style={styles.iconButton}
              accessibilityLabel="Toggle menu"
            >
              <Ionicons name="menu" size={22} color="#e6eef8" />
            </Pressable>
          )}
          {!searchOpen && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        <View style={styles.centerCluster}>
          <Animated.View
            style={[
              styles.searchWrap,
              {
                width: searchOpen ? "100%" : 0,
                opacity: searchOpacity,
                paddingHorizontal: searchOpen ? 12 : 0,
              },
            ]}
          >
            {searchOpen && (
              <View style={styles.searchInner}>
                <Ionicons
                  name="search-outline"
                  size={16}
                  color="#94a3b8"
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  ref={inputRef}
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search games..."
                  placeholderTextColor="#64748b"
                  style={styles.searchInput}
                  returnKeyType="search"
                  onSubmitEditing={handleSubmit}
                  accessibilityLabel="Search games"
                />
                {query.length > 0 && (
                  <Pressable
                    onPress={() => {
                      setQuery("");
                      setSearchText(undefined);
                      if (onSearch) onSearch("");
                    }}
                    accessibilityLabel="Clear search"
                    style={styles.clearBtn}
                  >
                    <Ionicons name="close-circle" size={18} color="#64748b" />
                  </Pressable>
                )}
              </View>
            )}
          </Animated.View>
        </View>

        <View style={styles.rightCluster}>
          <Pressable
            style={styles.iconButton}
            onPress={toggleSearch}
            accessibilityLabel={searchOpen ? "Close search" : "Open search"}
          >
            <Ionicons
              name={searchOpen ? "close" : "search"}
              size={20}
              color="#e6eef8"
            />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={onRightAction}
            accessibilityLabel="Notifications"
          >
            <Ionicons name={rightActionIcon as any} size={20} color="#e6eef8" />
          </Pressable>
          <Pressable
            style={styles.avatarBtn}
            onPress={() => {}}
            accessibilityLabel="Profile"
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/10.jpg" }}
              style={styles.avatar}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
    position: "relative",
  },
  pulseLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#5b21b6",
    borderRadius: 0,
  },
  leftCluster: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  centerCluster: {
    flex: 2,
    minWidth: 0,
  },
  rightCluster: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  avatarBtn: {
    padding: 2,
    borderRadius: 22,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  searchWrap: {
    height: 42,
    justifyContent: "center",
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#e2e8f0",
    paddingVertical: 0,
    paddingRight: 6,
    fontWeight: "500",
  },
  clearBtn: {
    padding: 1,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
});
