import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@/hooks/useGames";
import useGameStore from "@/store";

interface Props {
  platforms?: Platform[];
  otherData?: any[];
}

const DropdownComponent = ({ platforms, otherData }: Props) => {
  const setSelectedPlatform = useGameStore((s) => s.setSelectedPlatform);
  const setSortOrder = useGameStore((s) => s.setSortOrder);
  const selectedPlatform = useGameStore((s) => s.selectedPlatform);
  const sortOrder = useGameStore((s) => s.sortOrder);
  const [value, setValue] = useState<string | null>(
    selectedPlatform ? selectedPlatform.slug : (sortOrder ?? null)
  );

  useEffect(() => {
    if (platforms) {
      setValue(selectedPlatform ? selectedPlatform.slug : null);
    } else {
      setValue(sortOrder ?? null);
    }
  }, [selectedPlatform, sortOrder, platforms]);
  const data = platforms
    ? (platforms?.map((platform) => ({
        label: platform.name,
        value: platform.slug,
      })) ?? [])
    : otherData;

  const caretAnim = useRef(new Animated.Value(0)).current;
  const spin = caretAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleFocus = () => {
    Animated.timing(caretAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  const handleBlur = () => {
    Animated.timing(caretAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = (item: { label: string; value: string }) => {
    const onSelect = () => {
      const val = String(item.value);
      setValue(val);
      if (platforms) {
        const found = platforms.find((p) => p.slug === val) ?? null;
        setSelectedPlatform(found ?? undefined);
      } else {
        setSortOrder(val);
      }
    };

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: String(item.value) === value }}
        onPress={onSelect}
        style={[styles.item, String(item.value) === value && styles.itemActive]}
      >
        <Text style={styles.textItem}>{item.label}</Text>
        {String(item.value) === value && (
          <Ionicons
            style={styles.trailingIcon}
            color="#7c3aed"
            name="checkmark-circle-outline"
            size={20}
          />
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainer}
        activeColor="rgba(124,58,237,0.08)"
        data={data!}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(item) => {
          const val = String(item.value);
          setValue(val);
          if (platforms) {
            const found = platforms.find((p) => p.slug === val) ?? null;
            setSelectedPlatform(found ?? undefined);
          } else {
            setSortOrder(val);
          }
        }}
        renderLeftIcon={() => (
          <View style={styles.leftIconWrap}>
            <Ionicons
              style={styles.leftIcon}
              color="#94a3b8"
              name={platforms ? "hardware-chip-outline" : "options-outline"}
              size={18}
            />
          </View>
        )}
        renderRightIcon={() => (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="chevron-down-outline" size={18} color="#cbd5e1" />
          </Animated.View>
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: "48%",
    marginVertical: 6,
  },
  dropdown: {
    height: 46,
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: "rgba(15,23,42,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#0f172a",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    backdropFilter: "blur(12px)", // web only
  },
  dropdownContainer: {
    borderRadius: 16,
    paddingVertical: 6,
    backgroundColor: "rgba(15,23,42,0.92)",
    borderWidth: 1,
    borderColor: "rgba(124,58,237,0.25)",
  },
  itemContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  itemActive: {
    backgroundColor: "rgba(124,58,237,0.12)",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
    color: "#e2e8f0",
    fontWeight: "500",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#f1f5f9",
    fontWeight: "600",
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  leftIconWrap: {
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    opacity: 0.9,
  },
  trailingIcon: {
    marginLeft: 8,
  },
});
