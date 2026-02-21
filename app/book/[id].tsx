import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

// STYLES
import styles from "@/lib/styles/styles";
import colors from "../../lib/styles/colors";

// MODELS
import { Book } from "@/lib/models/Book";

// ICONS
import FontAwesome from "@expo/vector-icons/FontAwesome";

// REACT NATIVE PAPER
import { IconButton } from "react-native-paper";

// SHARE MODULE
import { shareBook } from "../../lib/utils/shareBook";

// STORAGE
import { StarRating } from "../../lib/components/StarRating";
import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from "../../lib/storage/favorites.storage";
import {
  addOrUpdateRating,
  getRatingById,
} from "../../lib/storage/ratings.storage";
import { getTempBook } from "../../lib/storage/temp.storage";

export default function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [ratingGiven, setRatingGiven] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadLocalData = async () => {
      setLoading(true);
      const temp = await getTempBook();
      if (!temp) {
        setLoading(false);
        return;
      }

      setBook(temp);

      // IS FAVOURITE?
      const fav = await isFavorite(temp.id);
      setIsFav(fav);

      // RAGING?
      const rating = await getRatingById(temp.id);
      setRatingGiven(rating?.score ?? 0);

      setLoading(false);
    };

    loadLocalData();
  }, [book?.id]);

  const addFav = async () => {
    if (!book) return;
    await addFavorite(book);
    setIsFav(true);
  };

  const delFav = async () => {
    if (!book) return;
    await removeFavorite(book.id);
    setIsFav(false);
  };

  const changeFavOption = () => {
    isFav
      ? Alert.alert(
          "Confirmation",
          "Delete this book from favourites?",
          [
            {
              text: "Yes",
              onPress: () => delFav(),
            },
            {
              text: "No",
              style: "cancel",
              onPress: () => console.log("Canceled"),
            },
          ],
          { cancelable: true },
        )
      : Alert.alert(
          "Confirmation",
          "Add this book to favourites?",
          [
            {
              text: "Yes",
              onPress: () => addFav(),
            },
            {
              text: "No",
              style: "cancel",
              onPress: () => console.log("Canceled"),
            },
          ],
          { cancelable: true },
        );
  };

  const giveRating = async (value: number) => {
    if (!book) return;
    setRatingGiven(value);
    await addOrUpdateRating(book.id, value);
  };

  if (loading || !book) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Loading book...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.detailsContainer}
      contentContainerStyle={styles.detailsContent}
      showsVerticalScrollIndicator={false}
    >
      {/* TITLE */}
      <Text style={styles.detailsTitle}>{book.title}</Text>

      {/* IMAGE */}
      {book.thumbnail && (
        <Image
          source={{ uri: book.thumbnail }}
          style={styles.detailsImage}
          resizeMode="contain"
        />
      )}

      {/* AUTHORS */}
      <Text style={styles.detailsAuthors}>
        {book.authors.length > 0 ? book.authors.join(", ") : "Unknown author"}
      </Text>

      {/* YEAR */}
      {book.publishedYear && (
        <Text style={styles.detailsYear}>{book.publishedYear}</Text>
      )}

      {/* SECTION */}
      <View style={styles.detailsSection}>
        {/* DESCRIPTION */}
        {book.description && (
          <>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.sectionText}>{book.description}</Text>
          </>
        )}

        {/* PUBLISHER */}
        {book.publisher && (
          <>
            <Text style={styles.sectionTitle}>Publisher</Text>
            <Text style={styles.sectionText}>{book.publisher}</Text>
          </>
        )}

        {/* CATEGORIES */}
        {book.categories && book.categories.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.sectionText}>{book.categories.join(", ")}</Text>
          </>
        )}

        {/* PAGES */}
        {book.pageCount && (
          <>
            <Text style={styles.sectionTitle}>Pages</Text>
            <Text style={styles.sectionText}>{book.pageCount}</Text>
          </>
        )}

        {/* LANGUAGES */}
        {book.language && book.language.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.sectionText}>{book.language}</Text>
          </>
        )}

        {/* IS FAV */}
        {isFav ? (
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Add Favourite</Text>
            <IconButton
              icon={() => (
                <FontAwesome
                  name="bookmark"
                  size={24}
                  color={colors.favourite}
                />
              )}
              size={24}
              onPress={() => {
                changeFavOption();
              }}
              style={styles.inlineIcon}
            />
          </View>
        ) : (
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Add Favourite</Text>
            <IconButton
              icon={() => (
                <FontAwesome name="bookmark-o" size={24} color="black" />
              )}
              size={24}
              onPress={() => {
                changeFavOption();
              }}
              style={styles.inlineIcon}
            />
          </View>
        )}
        {/* RATING */}
        <>
          <Text style={styles.sectionTitle}>Your rating for this book</Text>
          <StarRating
            rating={ratingGiven}
            onChange={(value) => {
              giveRating(value);
              console.log("New rating: ", value);
            }}
          />
        </>
        {/* SHARING BOOK */}
        <View style={styles.shareWrapper}>
          <IconButton
            icon="share-variant"
            size={26}
            onPress={() => shareBook(book)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
