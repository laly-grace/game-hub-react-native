import { Drawer } from "expo-router/drawer";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Games",
          headerBackground: () => (
            <View style={StyleSheet.absoluteFill} className="bg-fuchsia-700">
              {/* 🌈 Gradient overlay */}
              <LinearGradient
                colors={["rgba(0,5,10,0.9)", "transparent"]}
                style={StyleSheet.absoluteFill}
              />
            </View>
          ),
        }}
      />
    </Drawer>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <ScrollView {...props}>
      {/* 💎 Drawer header with blur + gradient + profile */}
      <ImageBackground
        source={{ uri: "https://picsum.photos/800/300" }}
        style={styles.drawerHeader}
      >
        {/* 💎 Blur effect (works on iOS & Android) */}
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

        {/* 🌈 Gradient overlay for better contrast */}
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={StyleSheet.absoluteFill}
        />

        {/* 👤 Profile avatar + name */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Laly Grace</Text>
          <Text style={styles.subtitle}>@lalygrace</Text>
        </View>
      </ImageBackground>

      {/* Default Drawer Items */}
      <DrawerItemList {...props} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    flex: 1,
    margin: 0,
    height: 180,
    width: "100%",
    justifyContent: "flex-end",
  },
  profileContainer: {
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 8,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
  },
});
