import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="light" />
      <Image
        style={styles.image}
        source={require("../assets/images/authBack.jpg")}
        contentFit="cover"
        transition={1000}
        blurRadius={50}
      />
      <Text className="text-4xl text-purple-300 flex absolute top-28">
        Welcome to Game Hub
      </Text>
      <View className="flex w-10/12 absolute top-44">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="flex bg-white/9 backdrop-blur-md border border-white/20 rounded-xl  p-10"
        >
          <View className="flex-1 justify-center ">
            <View className="w-full ">
              {/* <Image
                source={{
                  uri: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500",
                }}
                className="h-10 w-10 self-center"
                resizeMode="contain"
              /> */}
              {/* <View className="w-32 h-32 rounded-full bg-teal-700 flex justify-center items-center align-middle">
                <Text className="text-teal-900 items-center">L</Text>
              </View> */}
              <Text className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                Login to your account
              </Text>
            </View>

            <View className="mt-10 w-full max-w-sm self-center">
              {/* Email Field */}
              <View className="space-y-2">
                <Text className="text-sm font-medium text-gray-100">
                  Email address
                </Text>
                <View className="flex flex-row items-center rounded-lg pl-2 bg-blue-950">
                  <MaterialIcons name="email" size={24} color="white" />
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#6B7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full h-11 rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                  />
                </View>
              </View>

              {/* Password Field */}
              <View className="mt-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-medium text-gray-100">
                    Password
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center rounded-lg pl-2 bg-blue-950">
                  <MaterialIcons name="lock" size={24} color="white" />
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#6B7280"
                    secureTextEntry
                    className="mt-2 rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={() => router.push("/game")}
                className="mt-8 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2"
              >
                <Text className="text-center text-sm font-semibold text-white">
                  Login
                </Text>
              </TouchableOpacity>

              {/* Footer */}
              <Text className="mt-10 text-center text-sm text-gray-400">
                Not a member?{" "}
                <Text className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#0553",
  },
});
