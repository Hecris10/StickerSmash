import { Href, Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NoFounRouteScreen() {
  return (
    <View style={styles.container}>
      <Link href={"/" as Href}>Go back to Home Screen!</Link>
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

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
