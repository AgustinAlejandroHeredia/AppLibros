import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

// STYLES
import colors from "@/lib/styles/colors";
import styles from "@/lib/styles/styles";

// REACT NATIVE PAPER
import {
  ActivityIndicator,
  Card,
  IconButton,
  TextInput,
} from "react-native-paper";

// API
import { searchBooks } from "../../lib/api/googleBooks.api";

// MODELS
import { Book } from "../../lib/models/Book";
import { saveTempBook } from "../../lib/storage/temp.storage";

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [noSearchYet, setNoSearchYet] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const handleSearch = async () => {
    console.log(`Se pulsa el boton, contenido "${searchText}"`);
    setNoSearchYet(false);

    try {
      setLoading(true);
      setError(null);

      const result = await searchBooks(searchText);

      setBooks(result);
    } catch (error: any) {
      //console.log("Error during search : ", error);

      switch (error?.message) {
        case "GOOGLE_BOOKS_QUOTA_EXCEEDED":
          setError(
            "Google Books API requests limit reached. Please try again later.",
          );
          break;

        case "NO_INTERNET":
          setError("No internet connection. Please check your network.");
          break;

        case "GOOGLE_BOOKS_SERVER_ERROR":
          setError("Google Books service is unavailable. Try later.");
          break;

        case "GOOGLE_BOOKS_GENERIC_ERROR":
        default:
          setError("Something went wrong. Please try again later.");
          break;
      }

      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

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
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containter}>
      <View style={styles.searchWrapper}>
        <TextInput
          mode="outlined"
          placeholder="Ex: Martín Fierro"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          //outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
        />

        <IconButton
          icon="magnify"
          size={26}
          onPress={handleSearch}
          style={styles.searchIconButton}
          iconColor={colors.primary}
        />
      </View>

      {/* STATES AND MESSAGES */}
      {isLoading ? (
        // LOADING SPINNER
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.stateText}>Loading...</Text>
        </View>
      ) : error ? (
        // ERROR
        <View style={styles.centerState}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : noSearchYet ? (
        // FIRST SEARCH (ONBOARDING)
        <View style={styles.centerState}>
          <Text style={styles.stateText}>
            You can search the books you desire on the search input on top.
            {"\n\n"}
            Try searching by book name, author, year, etc.
          </Text>
        </View>
      ) : books.length === 0 ? (
        // NO RESULTS
        <View style={styles.centerState}>
          <Text style={styles.stateText}>No results found</Text>
        </View>
      ) : (
        // BOOK LIST
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={renderBook}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
