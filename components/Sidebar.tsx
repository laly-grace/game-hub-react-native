import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NavItem = {
  id: string;
  label: string;
  icon: string;
  badge?: number;
};

type Section = {
  id: string;
  title?: string;
  items: NavItem[];
};

const SECTIONS: Section[] = [
  {
    id: "main",
    title: "",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "speedometer-outline" },
      { id: "games", label: "Games", icon: "game-controller-outline" },
      { id: "library", label: "Library", icon: "library-outline" },
    ],
  },
  {
    id: "social",
    title: "Social",
    items: [
      { id: "friends", label: "Friends", icon: "people-outline", badge: 2 },
      {
        id: "messages",
        label: "Messages",
        icon: "chatbubbles-outline",
        badge: 5,
      },
    ],
  },
  {
    id: "more",
    title: "",
    items: [
      { id: "settings", label: "Settings", icon: "settings-outline" },
      { id: "help", label: "Help", icon: "help-circle-outline" },
    ],
  },
];

function MenuItem({
  item,
  active,
  onPress,
}: {
  item: NavItem;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[styles.menuItem, active ? styles.menuItemActive : null]}
      onPress={onPress}
    >
      <Ionicons
        name={item.icon as any}
        size={18}
        color={active ? "#fff" : "#cbd5e1"}
      />
      <Text
        style={[styles.menuItemText, active ? styles.menuItemTextActive : null]}
      >
        {item.label}
      </Text>
      {item.badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export default function Sidebar({
  style,
  onNavigate,
}: {
  style?: any;
  onNavigate?: (id: string) => void;
}) {
  const [active, setActive] = useState<string | null>("dashboard");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    social: true,
  });

  const handlePress = (id: string) => {
    setActive(id);
    console.log("Pressed");
  };

  return (
    <View style={[styles.root, style]}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/10.jpg" }}
            style={styles.profileAvatar}
          />
          <View>
            <Text style={styles.profileName}>Laly Grace</Text>
            <Text style={styles.profileHandle}>Gamer</Text>
          </View>
        </View>
        <Pressable style={styles.headerAction} onPress={() => {}}>
          <Ionicons name="ellipsis-vertical" size={18} color="#e6eef8" />
        </Pressable>
      </View>

      <ScrollView style={styles.sections} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((section) => (
          <View key={section.id} style={styles.section}>
            {section.title ? (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            ) : null}

            {section.id === "social" ? (
              <View>
                <Pressable
                  onPress={() =>
                    setExpanded((s) => ({ ...s, [section.id]: !s[section.id] }))
                  }
                  style={styles.collapseHeader}
                >
                  <Text style={styles.collapseTitle}>Social</Text>
                  <Ionicons
                    name={
                      expanded[section.id]
                        ? "chevron-up-outline"
                        : "chevron-down-outline"
                    }
                    size={16}
                    color="#9aa4b2"
                  />
                </Pressable>
                {expanded[section.id]
                  ? section.items.map((it) => (
                      <MenuItem
                        key={it.id}
                        item={it}
                        active={active === it.id}
                        onPress={() => handlePress(it.id)}
                      />
                    ))
                  : null}
              </View>
            ) : (
              section.items.map((it) => (
                <MenuItem
                  key={it.id}
                  item={it}
                  active={active === it.id}
                  onPress={() => handlePress(it.id)}
                />
              ))
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.footerBtn}
          onPress={() => handlePress("settings")}
        >
          <Ionicons name="moon-outline" size={16} color="#cbd5e1" />
          <Text style={styles.footerText}>Dark Mode</Text>
        </Pressable>
        <Pressable
          style={styles.footerBtn}
          onPress={() => handlePress("signout")}
        >
          <Ionicons name="log-out-outline" size={16} color="#fecaca" />
          <Text style={[styles.footerText, { color: "#fecaca" }]}>
            Sign out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingTop: 12,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileAvatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },
  profileName: {
    color: "#fff",
    fontWeight: "700",
  },
  profileHandle: {
    color: "#9aa4b2",
    fontSize: 12,
  },
  headerAction: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  sections: {
    marginTop: 6,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#9aa4b2",
    fontSize: 12,
    marginBottom: 6,
    paddingHorizontal: 6,
  },
  collapseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  collapseTitle: {
    color: "#cbd5e1",
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: "rgba(124,58,237,0.14)",
  },
  menuItemText: {
    color: "#cbd5e1",
    fontSize: 15,
    marginLeft: 8,
    flex: 1,
  },
  menuItemTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 28,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  footerBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  footerText: {
    color: "#cbd5e1",
  },
});
