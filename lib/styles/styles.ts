import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    padding: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
  },

  searchIconButton: {
    marginLeft: 6,
    marginTop: 4,
  },

  /* LIST */
  listContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  /* CARD */
  bookCard: {
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },

  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: colors.textPrimary,
  },

  bookImage: {
    width: "100%",
    height: 180,
    marginVertical: 10,
    borderRadius: 8,
  },

  bookAuthors: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  bookYear: {
    textAlign: "center",
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },

  /* STATES */
  centerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  stateText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },

  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    fontWeight: "600",
  },

  // DETAILS SCREEN

  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  detailsContent: {
    padding: 20,
    alignItems: "center",
  },

  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  detailsImage: {
    width: 200,
    height: 300,
    marginBottom: 16,
  },

  detailsAuthors: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
    color: "#444",
  },

  detailsYear: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },

  detailsSection: {
    width: "100%",
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: colors.primary,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  inlineIcon: {
    marginTop: 16,
    padding: 0,
    marginLeft: 6,
  },

  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },

  // FAV BUTTON

  favHeader: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 8,
  },

  // STARS CONTAINER

  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    marginHorizontal: 4,
  },

  // SHARE
  shareWrapper: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 16,
  },
});

export default styles;
