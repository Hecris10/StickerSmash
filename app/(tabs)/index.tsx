import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import domtoimage from "dom-to-image";
import { ImageSource } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowModalOptions(true);
      return;
    }

    return alert("You have not selected any image");
  };

  const onReset = () => {
    setShowModalOptions(false);
  };

  const onAddSticker = () => {
    setIsEmojiModalVisible(true);
  };

  const onCloseEmojiModal = () => {
    setIsEmojiModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (imageRef && imageRef.current) {
      let height = 0;
      let width = 0;
      imageRef.current.measure((_x, _y, _viewWidth, viewHeight) => {
        height = viewHeight;
      });
      {
        if (Platform.OS === "web") {
          try {
            //@ts-ignore
            const dataUrl = await domtoimage.toJpeg(imageRef.current, {
              quality: 0.95,
              width: 320,
              height: 440,
            });

            let link = document.createElement("a");
            link.download = "sticker-smash.jpeg";
            link.href = dataUrl;
            link.click();
            return;
          } catch (error) {
            return console.log(error);
          }
        }

        try {
          const uri = await captureRef(imageRef, {
            height,
            quality: 1,
          });

          await MediaLibrary.saveToLibraryAsync(uri);
          if (uri) {
            alert("Image saved successfully");
          }
        } catch (error) {
          alert("An error occurred while saving the image");
        }
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            selectedImage={selectedImage}
            imgSource={PlaceholderImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showModalOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowModalOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isEmojiModalVisible} onClose={onCloseEmojiModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseEmojiModal} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
