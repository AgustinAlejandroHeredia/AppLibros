import { FontAwesome } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import colors from "../styles/colors";
import styles from "../styles/styles";

type Props = {
  rating: number; // 0 a 5
  onChange: (value: number) => void;
  size?: number;
};

export const StarRating = ({ rating, onChange, size = 24 }: Props) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= rating;

        return (
          <Pressable key={value} onPress={() => onChange(value)} hitSlop={10}>
            <FontAwesome
              name={filled ? "star" : "star-o"}
              size={size}
              color={filled ? colors.primary : "black"}
              style={styles.star}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
