import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import useGames from "@/hooks/useGames";
import GameCard from "./GameCard";
import { Image as ExpoImage } from "expo-image";

export default function GameScroll() {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGames();

  // Flatten paginated data into a single array
  const games = data?.pages?.flatMap((page: any) => page.results) ?? [];

  // Prefetch top-N images for better offline readiness
  const topImageUrls = useMemo(
    () =>
      games
        .slice(0, 20)
        .map((g: any) => g.background_image)
        .filter(Boolean),
    [games]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await Promise.all(
          topImageUrls.map((u) =>
            typeof u === "string" ? ExpoImage.prefetch(u) : Promise.resolve()
          )
        );
      } catch {
        // ignore prefetch failures
      }
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [topImageUrls]);

  const onEndReachedCalledDuringMomentum = useRef(false);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <GameCard game={item} />,
    []
  );
  const keyExtractor = useCallback(
    (item: { id: number | string }) => String(item.id),
    []
  );

  // Footer for loader or end message
  const ListFooterComponent = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
          <Text style={styles.footerText}>Loading more...</Text>
        </View>
      );
    }
    if (!hasNextPage) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>You’ve seen it all 🎮</Text>
        </View>
      );
    }
    return null;
  };

  // Error + refresh option
  if (error && games.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>⚠️ {error.message}</Text>
        <Text style={styles.subText}>Pull down to retry</Text>
      </View>
    );
  }

  // Initial loading skeleton (simplified)
  if (isLoading && games.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.subText}>Loading games...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContainer}
      onEndReached={() => {
        if (!onEndReachedCalledDuringMomentum.current) {
          loadMore();
          onEndReachedCalledDuringMomentum.current = true;
        }
      }}
      onEndReachedThreshold={0.4}
      onMomentumScrollBegin={() =>
        (onEndReachedCalledDuringMomentum.current = false)
      }
      ListFooterComponent={ListFooterComponent}
      refreshControl={
        <RefreshControl
          refreshing={!!isLoading}
          onRefresh={() => refetch?.()}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    rowGap: 10,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    marginTop: 8,
    color: "gray",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
    marginBottom: 6,
  },
  subText: {
    color: "gray",
  },
});
