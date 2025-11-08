import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fade]);

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

  /* The form is intended to be sticky/static and full-screen; we don't animate
     it in response to keyboard events. */

  const circleOneStyle = {
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
          outputRange: [-10, 10],
        }),
      },
      {
        scale: circleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03],
        }),
      },
    ],
    opacity: circleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 0.8],
    }),
  };

  const circleTwoStyle = {
    transform: [
      {
        translateX: circleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, -30],
        }),
      },
      {
        translateY: circleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 20],
        }),
      },
      {
        scale: circleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.02],
        }),
      },
    ],
    opacity: circleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.85, 0.7],
    }),
  };

  function validateEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleLogin() {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    // Simulate an authentication request; replace with real API call
    setTimeout(() => {
      setLoading(false);
      router.push("/game");
    }, 900);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={undefined}>
      <StatusBar style="light" />

      {/* Animated layered background shapes (no external image) */}
      <Animated.View style={[styles.bgCircleOne, circleOneStyle]} />
      <Animated.View style={[styles.bgCircleTwo, circleTwoStyle]} />
      <View style={styles.dim} />

      <View style={styles.scrollContainer}>
        <Animated.View style={[styles.card, { opacity: fade }]}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue to Game Hub</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="email" size={20} color="#cbd5e1" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@domain.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                accessible
                accessibilityLabel="Email address"
              />
            </View>

            <View style={styles.passwordRowHeader}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity
                onPress={() => {
                  /* implement forgot flow */
                }}
              >
                <Text style={styles.forgot}>Forgot?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputRow}>
              <MaterialIcons name="lock" size={20} color="#cbd5e1" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                style={styles.input}
                accessible
                accessibilityLabel="Password"
              />
              <Pressable
                onPress={() => setShowPassword((s) => !s)}
                style={styles.showBtn}
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                <Text style={styles.showBtnText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.submit, loading ? styles.submitDisabled : null]}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Not a member?</Text>
              <TouchableOpacity>
                <Text style={styles.signup}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
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
  dim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(2,6,23,0.5)",
  },
  bgCircleOne: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: 520,
    top: -160,
    left: -100,
    backgroundColor: "rgba(99,102,241,0.18)",
    // keep subtle depth in background shapes but no hard shadows on form
  },
  bgCircleTwo: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 420,
    bottom: -120,
    right: -80,
    backgroundColor: "rgba(234,88,12,0.12)",
    // keep subtle depth in background shapes but no hard shadows on form
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    width: "100%",
  },
  card: {
    width: "92%",
    maxWidth: 520,
    backgroundColor: "rgba(255,255,255,0.028)",
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingBottom: 40,
    flex: 1,
    justifyContent: "center",
    // subtle inner spacing to accommodate the floating logo
    paddingTop: 48,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#e9d5ff",
    textAlign: "center",
  },
  subtitle: {
    color: "#c7cfe2",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 14,
  },
  form: {
    marginTop: 8,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
    // subtle backdrop effect
    borderWidth: 0,
  },
  input: {
    color: "#e6eef8",
    marginLeft: 10,
    flex: 1,
    paddingVertical: 6,
  },
  passwordRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgot: {
    color: "#93c5fd",
    fontSize: 13,
  },
  showBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  showBtnText: {
    color: "#93c5fd",
    fontSize: 13,
  },
  error: {
    color: "#fecaca",
    fontSize: 13,
    marginBottom: 8,
  },
  submit: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  submitDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  footerText: {
    color: "#94a3b8",
  },
  signup: {
    color: "#93c5fd",
    marginLeft: 6,
  },
});
