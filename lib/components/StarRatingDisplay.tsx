import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import colors from "../styles/colors";
import styles from "../styles/styles";

type Props = {
  rating: number; // 0 a 5
  size?: number;
};

export const StarRatingDisplay = ({ rating, size = 24 }: Props) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= rating;

        return (
          <FontAwesome
            key={value}
            name={filled ? "star" : "star-o"}
            size={size}
            color={filled ? colors.primary : "black"}
            style={styles.star}
          />
        );
      })}
    </View>
  );
};
