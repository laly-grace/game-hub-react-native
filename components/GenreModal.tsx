import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useGenres from "@/hooks/useGenres";
import { Image } from "expo-image";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import useGameStore from "@/store";

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

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Filter By Genre</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          <View>
            <ScrollView>
              <View className="flex flex-col gap-1 py-1.5">
                {data?.results.map((item) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGenre(item);
                      setIsModalVisible(false);
                    }}
                    key={item.id}
                    activeOpacity={0.7}
                    className="flex w-full flex-row items-center p-3 rounded-md transition-colors
                       hover:bg-slate-100 dark:hover:bg-gray-700
                       focus:bg-slate-100 dark:focus:bg-gray-700
                       active:bg-slate-100 dark:active:bg-gray-700"
                  >
                    <Image
                      source={item.image_background}
                      style={{ width: 25, height: 25, borderRadius: 20 }}
                    />

                    <Text className="text-slate-800 ml-3 dark:text-white text-xl font-bold">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "75%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "absolute",
    bottom: 0,
    paddingBottom: "10%",
  },
  titleContainer: {
    height: "6%",
    backgroundColor: "gray",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
