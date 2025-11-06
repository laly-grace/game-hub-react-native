import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
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
      <Pressable onPress={onSelect} style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {String(item.value) === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="safety"
            size={20}
          />
        )}
      </Pressable>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data!}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
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
        <AntDesign style={styles.icon} color="black" name="safety" size={20} />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    // flex: 1,
    // margin: 16,
    width: "45%",
    margin: 4,
    height: 30,
    backgroundColor: "#ECEEDF",
    borderRadius: 40,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B7E5CD",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
