import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  postBackgroundColor,
  IMAGE_HEIGHT_ONLY_ROW,
  IMAGE_HEIGHT_TWO_ROW,
} from "../../constants/community";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

const IMAGES_GAP = 2;

export default function ImagesContainer({ images = [], postInfo }) {
  const imagesCount = images.length;

  const navigation = useNavigation();

  function handlePress(imageIndex) {
    Haptics.selectionAsync();

    const reorderedImages = [
      ...images.slice(imageIndex),
      ...images.slice(0, imageIndex),
    ];

    navigation.navigate("MainCommunityStack", {
      screen: "CommunityImages",
      params: { images: reorderedImages, postInfo: postInfo },
    });
  }

  return (
    <View style={[styles.container, { gap: imagesCount === 3 && 2 }]}>
      {imagesCount === 1 && (
        <Pressable
          onPress={() => handlePress(0)}
          style={({ pressed }) =>
            pressed
              ? [styles.singleImageContainer, styles.pressed]
              : styles.singleImageContainer
          }
        >
          <Image source={{ uri: images[0]?.url }} style={styles.singleImage} />
        </Pressable>
      )}
      {(imagesCount === 2 || imagesCount === 4) &&
        images.map((image, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            style={({ pressed }) =>
              pressed
                ? [styles.equalImageContainer, styles.pressed]
                : styles.equalImageContainer
            }
          >
            <Image
              source={{ uri: image?.url }}
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
          </Pressable>
        ))}
      {imagesCount === 3 && (
        <>
          <Pressable
            onPress={() => handlePress(0)}
            style={({ pressed }) =>
              pressed
                ? [styles.largeImageContainer, styles.pressed]
                : styles.largeImageContainer
            }
          >
            <Image source={{ uri: images[0]?.url }} style={styles.largeImage} />
          </Pressable>
          <View style={styles.smallImagesContainer}>
            {images.slice(1, 3).map((image, index) => (
              <Pressable
                key={index}
                onPress={() => handlePress(index + 1)}
                style={(pressed) =>
                  pressed
                    ? [styles.smallImageContainer, styles.pressed]
                    : styles.smallImageContainer
                }
              >
                <Image source={{ uri: image?.url }} style={styles.smallImage} />
              </Pressable>
            ))}
          </View>
        </>
      )}
      {imagesCount > 4 && (
        <>
          {images.slice(0, 3).map((image, index) => (
            <Pressable
              key={index}
              onPress={() => handlePress(index)}
              style={({ pressed }) =>
                pressed
                  ? [styles.equalImageContainer, styles.pressed]
                  : [styles.equalImageContainer]
              }
            >
              <Image
                source={{ uri: image?.url }}
                style={[styles.equalImage, { height: IMAGE_HEIGHT_TWO_ROW }]}
              />
            </Pressable>
          ))}
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.plusContainer, styles.pressed]
                : [styles.plusContainer]
            }
            onPress={() => handlePress(0)}
          >
            <Ionicons name="eye" size={26} color={Colors.lightOcean} />
            <TextCommonsMedium style={styles.moreText}>
              +{imagesCount - 3}
            </TextCommonsMedium>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
    overflow: "hidden",
  },

  singleImageContainer: {
    width: "100%",
    height: IMAGE_HEIGHT_ONLY_ROW,
  },

  singleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  equalImageContainer: {
    flexBasis: "50%",
    borderWidth: IMAGES_GAP,
    borderColor: postBackgroundColor,
  },

  equalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  largeImageContainer: {
    flex: 1,
    height: IMAGE_HEIGHT_ONLY_ROW,
  },

  largeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  smallImagesContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  smallImageContainer: {
    width: "100%",
    height: IMAGE_HEIGHT_TWO_ROW,
  },

  smallImage: {
    width: "100%",
    height: "100%",
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
