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
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

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
        drawerStyle: { backgroundColor: "transparent" },
        // sceneContainerStyle: { backgroundColor: "transparent" },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Games",
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
          headerTitleStyle: { fontSize: 18, fontWeight: "700", color: "#fff" },
          headerRight: () => (
            <View style={styles.headerActions}>
              <Pressable
                style={styles.iconButton}
                onPress={() => {
                  /* TODO: open search */
                }}
              >
                <Ionicons name="search-outline" size={18} color="#e6eef8" />
              </Pressable>
              <Pressable
                style={styles.avatarBtn}
                onPress={() => {
                  /* TODO: open profile */
                }}
              >
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/10.jpg",
                  }}
                  style={styles.headerAvatar}
                />
              </Pressable>
            </View>
          ),
        }}
      />
    </Drawer>
  );
}

function CustomDrawerContent(props: any) {
  const itemsFade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(itemsFade, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [itemsFade]);

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
      contentContainerStyle={styles.drawerContent}
    >
      <Animated.View style={[styles.headerWrap, { opacity: itemsFade }]}>
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
      </Animated.View>

      <Animated.View
        style={{
          opacity: itemsFade,
          transform: [
            {
              translateX: itemsFade.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <View style={styles.menuContainer}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeIndicator,
              { transform: [{ translateY: activeY }] },
            ]}
          />

          {state.routes.map((route: any, i: number) => {
            const focused = state.index === i;
            const options = descriptors[route.key]?.options || {};
            const label = options.drawerLabel ?? options.title ?? route.name;
            const iconName = iconMap[route.name] ?? "game-controller-outline";

            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={[
                  styles.menuItem,
                  focused ? styles.menuItemActive : null,
                ]}
              >
                <Ionicons
                  name={iconName as any}
                  size={18}
                  color={focused ? "#fff" : "#cbd5e1"}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    focused ? styles.menuItemTextActive : null,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>

      <View style={styles.footerContainer}>
        <Pressable
          style={styles.footerAction}
          onPress={() => props.navigation.navigate("settings")}
        >
          <Ionicons name="settings-outline" size={18} color="#cbd5e1" />
          <Text style={styles.footerText}>Settings</Text>
        </Pressable>
        <Pressable
          style={styles.footerAction}
          onPress={() => {
            /* sign out flow */
          }}
        >
          <Ionicons name="log-out-outline" size={18} color="#fecaca" />
          <Text style={[styles.footerText, { color: "#fecaca" }]}>
            Sign out
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    flex: 1,
    margin: 0,
    // height: 180,
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
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
    paddingTop: 12,
    paddingHorizontal: 12,
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
});
