import React from "react";
import { Slot } from "expo-router";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
};

export default RootLayout;
