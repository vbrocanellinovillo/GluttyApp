import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { postBackgroundColor } from "../../constants/community";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

const IMAGE_HEIGHT_ONLY_ROW = 284;
const IMAGE_HEIGHT_TWO_ROW = 140;
const IMAGES_GAP = 2;

export default function ImagesContainer({ images = [] }) {
  const imagesCount = images.length;

  return (
    <Pressable>
      <View style={[styles.container, { gap: imagesCount === 3 && 2 }]}>
        {imagesCount === 1 && (
          <Image source={{ uri: images[0] }} style={styles.singleImage} />
        )}
        {(imagesCount === 2 || imagesCount === 4) &&
          images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={[
                styles.equalImage,
                {
                  height:
                    imagesCount === 2
                      ? IMAGE_HEIGHT_ONLY_ROW
                      : IMAGE_HEIGHT_TWO_ROW,
                },
              ]}
            />
          ))}
        {imagesCount === 3 && (
          <>
            <Image source={{ uri: images[0] }} style={styles.largeImage} />
            <View style={styles.smallImagesContainer}>
              {images.slice(1, 3).map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.smallImage}
                />
              ))}
            </View>
          </>
        )}
        {imagesCount > 4 && (
          <>
            {images.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={[styles.equalImage, { height: IMAGE_HEIGHT_TWO_ROW }]}
              />
            ))}
            <View style={styles.plusContainer}>
              <Ionicons name="eye" size={26} color={Colors.lightOcean} />
              <TextCommonsMedium style={styles.moreText}>
                +{imagesCount - 3}
              </TextCommonsMedium>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
    overflow: "hidden",
  },

  singleImage: {
    width: "100%",
    height: IMAGE_HEIGHT_ONLY_ROW,
    resizeMode: "cover",
  },

  equalImage: {
    flexBasis: "50%",
    resizeMode: "fill",
    borderWidth: IMAGES_GAP,
    borderColor: postBackgroundColor,
  },

  largeImage: {
    flex: 1,
    height: IMAGE_HEIGHT_ONLY_ROW,
  },

  smallImagesContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  smallImage: {
    width: "100%",
    height: IMAGE_HEIGHT_TWO_ROW,
    resizeMode: "cover",
  },

  plusContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: Colors.oceanBlue,
    borderWidth: IMAGES_GAP,
    borderColor: postBackgroundColor,
  },

  moreText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.lightOcean,
  },
});
