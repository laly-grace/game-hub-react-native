import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useGenres from "@/hooks/useGenres";
import { Image } from "expo-image";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import useGameStore from "@/store";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function GameModal({ isVisible, children, onClose }: Props) {
  const { data } = useGenres();
  const setSelectedGenre = useGameStore((s) => s.setSelectedGenre);
  const setIsModalVisible = useGameStore((s) => s.setIsModalVisible);
  const selectedGenre = useGameStore((s) => s.selectedGenre);

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const list = data?.results || [];
    if (!query.trim()) return list;
    return list.filter((g) =>
      g.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data?.results, query]);

  const backdrop = useRef(new Animated.Value(0)).current;
  const sheet = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(sheet, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 10,
          speed: 12,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheet, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, backdrop, sheet]);

  const translateY = sheet.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const backOpacity = backdrop.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const close = () => {
    onClose?.();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      {/* Dimmed animated backdrop */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0,0,0,0.6)", opacity: backOpacity },
        ]}
      />
      <TouchableWithoutFeedback onPress={close}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>

      {/* Bottom sheet */}
      <Animated.View
        style={[styles.modalContent, { transform: [{ translateY }] }]}
      >
        {/* Layered background */}
        <LinearGradient
          colors={["#0b1220", "#0f172a"]}
          style={StyleSheet.absoluteFill}
        />
        <BlurView
          intensity={30}
          tint="dark"
          style={[StyleSheet.absoluteFill, { opacity: 0.25 }]}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Filter by Genre</Text>
          <Pressable
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel="Close filter"
          >
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>

        <View style={styles.searchRow}>
          <MaterialIcons name="search" color="#98a2b3" size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search genres..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            accessibilityLabel="Search genres"
          />
        </View>

        <ScrollView contentContainerStyle={styles.listContent}>
          {filtered?.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSelectedGenre(item);
                setIsModalVisible(false);
                close();
              }}
              activeOpacity={0.8}
              style={[
                styles.row,
                selectedGenre?.id === item.id && styles.rowActive,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedGenre?.id === item.id }}
            >
              <Image source={item.image_background} style={styles.rowImage} />
              <Text style={styles.rowText} numberOfLines={1}>
                {item.name}
              </Text>
              {selectedGenre?.id === item.id && (
                <MaterialIcons name="check-circle" color="#7c3aed" size={18} />
              )}
            </TouchableOpacity>
          ))}
          {filtered?.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No genres found</Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "75%",
    width: "100%",
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    position: "absolute",
    bottom: 0,
    paddingBottom: 24,
    overflow: "hidden",
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  searchRow: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: "#eef2ff",
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 28,
  },
  row: {
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    marginBottom: 6,
    gap: 10,
  },
  rowActive: {
    backgroundColor: "rgba(124,58,237,0.12)",
  },
  rowImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  rowText: {
    color: "#f8fafc",
    fontWeight: "600",
    flex: 1,
  },
  empty: {
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    color: "#cbd5e1",
  },
});
