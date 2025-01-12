import { Image, ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

export default function ImageViewer({
  imgSource,
  selectedImage,
}: {
  imgSource: ImageSource;
  selectedImage: string;
}) {
  const source = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
