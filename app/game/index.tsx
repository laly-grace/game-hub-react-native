import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Home() {
  return (
    <View style={styles.container}>
      <View className="p-1">
        <Text className="text-4xl font-bold">New and Trending</Text>
        <Text className="text-sm">Based on player counts and release date</Text>
      </View>
      <View>
        <Picker>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
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
