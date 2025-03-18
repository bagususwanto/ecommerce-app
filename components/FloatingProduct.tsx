import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";

// Ambil ukuran layar
const { width, height } = Dimensions.get("window");

const FloatingProduct = ({
  image,
  startAnimation,
  onAnimationEnd,
}: {
  image: string;
  startAnimation: boolean;
  onAnimationEnd: () => void;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (startAnimation) {
      // Hitung posisi tujuan berdasarkan ukuran layar
      const targetX = width * 0.8; // Menuju tengah layar (bisa disesuaikan)
      const targetY = -height * 0.8; // Naik ke atas, 70% dari tinggi layar

      translateX.value = withTiming(targetX, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });

      translateY.value = withTiming(targetY, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });

      // Animasi mengecil (dari 1 ke 0.3)
      scale.value = withTiming(0.3, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });

      // Gunakan `withDelay` agar opacity tidak langsung hilang
      opacity.value = withDelay(
        700,
        withTiming(0, { duration: 500 }, (finished) => {
          if (finished) {
            runOnJS(onAnimationEnd)();
          }
        })
      );
    }
  }, [startAnimation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: image }}
        style={[styles.image, animatedStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: height * 0.1, right: width * 0.7 },
  image: { width: 140, height: 140, borderRadius: 10 },
});

export default FloatingProduct;
