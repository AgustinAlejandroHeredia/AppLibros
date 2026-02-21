import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { StarRatingDisplay } from "../../lib/components/StarRatingDisplay";
import { Book } from "../../lib/models/Book";
import { getFavorites } from "../../lib/storage/favorites.storage";
import { getRatingById } from "../../lib/storage/ratings.storage";
import { saveTempBook } from "../../lib/storage/temp.storage";
import colors from "../../lib/styles/colors";
import styles from "../../lib/styles/styles";

export default function Favorites() {
  const [loading, setLoading] = useState<boolean>(false);
  const [favs, setFavorites] = useState<Book[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        setLoading(true);
        const favs = await getFavorites();
        setFavorites(favs);

        const ratingsMap: Record<string, number> = {};
        for (const book of favs) {
          const rating = await getRatingById(book.id);
          ratingsMap[book.id] = rating?.score ?? 0;
        }
        setRatings(ratingsMap);

        setLoading(false);
      };

      loadFavorites();
    }, []),
  );

  const handleSelectBook = async (book: Book) => {
    await saveTempBook(book);
    router.push(`/book/${book.id}`);
  };

  const renderBook = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSelectBook(item)}
      >
        <Card style={styles.bookCard}>
          <Card.Content>
            {/* Title */}
            <Text style={styles.bookTitle}>{item.title}</Text>

            {/* Image */}
            {item.thumbnail && (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.bookImage}
                resizeMode="contain"
              />
            )}

            {/* Authors */}
            <Text style={styles.bookAuthors}>
              {item.authors.length > 0
                ? item.authors.join(", ")
                : "Unknown author"}
            </Text>

            {/* Year */}
            {item.publishedYear && (
              <Text style={styles.bookYear}>{item.publishedYear}</Text>
            )}

            {/* Rating given */}
            <StarRatingDisplay rating={ratings[item.id] ?? 0} size={16} />
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containter}>
      {/* LOADING */}
      {loading && (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.stateText}>Loading...</Text>
        </View>
      )}

      {/* EMPTY */}
      {!loading && favs.length === 0 && (
        <View style={styles.centerState}>
          <Text style={styles.stateText}>No favorites added yet</Text>
          <Text style={styles.stateText}>
            You can search for a book at the Home section and once you find what
            you like, you can add it to your favorites with the option at the
            bottom once you selected it.
          </Text>
        </View>
      )}

      {/* BOOK LIST */}
      {!loading && favs.length > 0 && (
        <FlatList
          data={favs}
          keyExtractor={(item) => item.id}
          renderItem={renderBook}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
