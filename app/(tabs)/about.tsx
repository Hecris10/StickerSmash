import { Image, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.icon}
      />
      <Text style={styles.text}>StickerSmash</Text>
      <Text style={styles.description}>
        StickerSmash is a fun and interactive app that allows you to create,
        share, and explore a variety of stickers. Whether you're looking to add
        some flair to your messages or just have fun with friends, StickerSmash
        has got you covered!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  description: {
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
});
