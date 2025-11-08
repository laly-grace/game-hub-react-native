import React, { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { Slot } from "expo-router";
import "./global.css";
import {
  QueryClient,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

// Wire React Query's online detection to NetInfo
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    const online = Boolean(state.isConnected && state.isInternetReachable);
    setOnline(online);
  });
});

const RootLayout = () => {
  // Stable QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data around for 30 days for offline access
            gcTime: 1000 * 60 * 60 * 24 * 30,
            // Avoid aggressive refetches; we’ll refetch on focus/online
            staleTime: 1000 * 60 * 60, // 1 hour
            retry: 2,
            networkMode: "offlineFirst",
          },
        },
      })
  );

  // Persist to AsyncStorage
  const [persister] = useState(() =>
    createAsyncStoragePersister({
      storage: AsyncStorage,
      key: "rq-cache",
      throttleTime: 1000,
    })
  );

  // Let React Query know when the app gains focus
  useEffect(() => {
    const onAppStateChange = (status: string) => {
      focusManager.setFocused(status === "active");
    };
    const sub = AppState.addEventListener("change", onAppStateChange);
    return () => sub.remove();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        buster: Platform.OS + "-v1",
      }}
    >
      <Slot />
    </PersistQueryClientProvider>
  );
};

export default RootLayout;
