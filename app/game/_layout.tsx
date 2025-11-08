import { Drawer } from "expo-router/drawer";
import React, { useEffect, useRef } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
  Platform,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import Sidebar from "../../components/Sidebar";
import AppHeader from "../../components/AppHeader";

export default function Layout() {
  const headerFade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [headerFade]);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        headerStyle: { backgroundColor: "transparent" },
        drawerType: Platform.OS === "web" ? "permanent" : "front",
        drawerStyle: {
          backgroundColor: "transparent",
          width: 300,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={({ navigation }) => ({
          drawerLabel: "Home",
          title: "Games",
          header: () => (
            <AppHeader
              title="Games"
              onToggleMenu={() => navigation.toggleDrawer()}
            />
          ),
          headerBackground: () => (
            <Animated.View
              style={[StyleSheet.absoluteFill, { opacity: headerFade }]}
            >
              {/* animated gradient header for a richer, modern look */}
              <LinearGradient
                colors={["#0f172a", "#5b21b6"]}
                start={[0, 0]}
                end={[1, 1]}
                style={StyleSheet.absoluteFill}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.45)", "transparent"]}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          ),
          headerTitleAlign: "center",
        })}
      />
    </Drawer>
  );
}

function CustomDrawerContent(props: any) {
  // subtle drifting background shapes to give the drawer a rich, layered look
  const itemsFade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(itemsFade, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [itemsFade]);

  const circleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(circleAnim, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [circleAnim]);

  const ITEM_H = 52;
  const activeY = useRef(
    new Animated.Value((props.state?.index ?? 0) * ITEM_H)
  ).current;
  useEffect(() => {
    const to = (props.state?.index ?? 0) * ITEM_H;
    Animated.spring(activeY, {
      toValue: to,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [props.state?.index, activeY]);

  const { state, navigation, descriptors } = props as any;
  const iconMap: Record<string, string> = {
    index: "home-outline",
    library: "library-outline",
    favorites: "heart-outline",
    trending: "trending-up",
    profile: "person-outline",
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ flex: 1 }}
      contentContainerStyle={styles.drawerContent}
    >
      {/* Layered animated background behind drawer content */}
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.drawerBg]}
      >
        <LinearGradient
          colors={["#071023", "#081226"]}
          start={[0, 0]}
          end={[1, 1]}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          style={[
            styles.bgCircleOne,
            {
              transform: [
                {
                  translateX: circleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 20],
                  }),
                },
                {
                  translateY: circleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 8],
                  }),
                },
              ],
              opacity: 0.9,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bgCircleTwo,
            {
              transform: [
                {
                  translateX: circleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, -18],
                  }),
                },
                {
                  translateY: circleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [6, -6],
                  }),
                },
              ],
            },
          ]}
        />

        {/* soft overlay to add depth and subtle texture */}
        <LinearGradient
          colors={["rgba(255,255,255,0.02)", "rgba(0,0,0,0.12)"]}
          start={[0.5, 0]}
          end={[0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      {/* <Animated.View style={[styles.headerWrap, { opacity: itemsFade }]}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/800/300" }}
          style={styles.drawerHeader}
          imageStyle={{
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        >
          <LinearGradient
            colors={["rgba(20,20,30,0.8)", "transparent"]}
            style={StyleSheet.absoluteFill}
          />
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.profileRow}>
            <LinearGradient
              colors={["#7c3aed", "#06b6d4"]}
              style={styles.avatarRing}
            >
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/10.jpg",
                }}
                style={styles.avatar}
              />
            </LinearGradient>

            <View style={styles.profileText}>
              <Text style={styles.name}>Laly Grace</Text>
              <Text style={styles.subtitle}>@lalygrace</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View> */}

      <Animated.View
        style={[
          styles.sidebarContainer,
          {
            opacity: itemsFade,
            transform: [
              {
                translateX: itemsFade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Sidebar
          style={{ flex: 1 }}
          onNavigate={(id: string) => {
            const navMap: Record<string, string> = {
              dashboard: "index",
              games: "index",
              library: "library",
              friends: "friends",
              messages: "messages",
              settings: "settings",
              help: "help",
            };
            if (id === "signout") {
              console.log("Sign out requested from sidebar");
              return;
            }
            const route = navMap[id] ?? id;
            try {
              navigation.navigate(route);
            } catch (e) {
              console.warn("Navigation target missing:", route, e);
            }
          }}
        />
        {/* Debug fallback if sidebar somehow fails to mount */}
        <Text style={styles.debugFallback}>Laly Grace</Text>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    height: 180,
    margin: 0,
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
  drawerContent: {
    paddingBottom: 24,
    backgroundColor: "transparent",
    flexGrow: 1,
    flex: 1,
  },
  headerWrap: {
    overflow: "hidden",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    padding: 4,
  },
  profileText: {
    justifyContent: "center",
  },
  menuContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuWrapper: {
    // hold menu in a normal flow while drawer background is absolutely positioned
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: "rgba(124,58,237,0.14)",
  },
  menuItemText: {
    color: "#cbd5e1",
    fontSize: 15,
  },
  menuItemTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  activeIndicator: {
    position: "absolute",
    left: 8,
    right: 8,
    top: 8,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(124,58,237,0.12)",
  },
  footerContainer: {
    // push footer to the bottom of the drawer
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  drawerBg: {
    zIndex: -1,
    opacity: 1,
  },
  bgCircleOne: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    left: -80,
    top: -120,
    backgroundColor: "rgba(124,58,237,0.14)",
    shadowColor: "#7c3aed",
  },
  bgCircleTwo: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    right: -60,
    bottom: -80,
    backgroundColor: "rgba(6,182,212,0.08)",
  },
  footerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  footerText: {
    color: "#cbd5e1",
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.03)",
    marginRight: 6,
  },
  avatarBtn: {
    padding: 2,
    borderRadius: 20,
  },
  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  sidebarContainer: {
    flex: 1,
    paddingVertical: 8,
    // temporary background to ensure visibility; remove if not needed
    backgroundColor: "rgba(255,255,255,0.02)",
    zIndex: 1,
  },
  debugFallback: {
    position: "absolute",
    bottom: 4,
    right: 8,
    fontSize: 10,
    color: "#64748b",
  },
});
