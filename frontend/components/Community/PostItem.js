import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import PostInfoContainer from "./PostInfoContainer";
import { Divider } from "react-native-paper";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";
import UserImage from "../UI/UserImage/UserImage";
import { Ionicons } from "@expo/vector-icons";
import TagItem from "./TagItem";
import ImagesContainer from "./ImagesContainer";
import { postBackgroundColor } from "../../constants/community";
import { useSelector } from "react-redux";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useState } from "react";
import ContextualMenu from "../UI/contextualMenu";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PostItem({
  post,
  containerStyle,
  curved,
  curvedStyle,
  onPress,
  iconPost = "chevron-forward-outline",
  onPressIcon,
  isReportable = false,
  handleReportPost,
  handleReportUser,
  handleBanPost,
  handleResolvePost,
}) {
  const name = useSelector((state) => state?.auth?.userData?.username);

  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar el menú contextual
  
  const [showAdmin, setShowAdmin] = useState(false)
  const scaleAnimation = useSharedValue(0);

  const animationStlye = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scaleAnimation.value) }],
    };
  });


  const admin = useSelector((state) => state.auth.isAdmin);

  const [animationIcon, setAnimationIcon] = useState("");
  const [animationColor, setAnimationColor] = useState("");

  let borrar = true;


  if (post?.username == name) {
    borrar = true;
  } else {
    borrar = false;
  }

  function handlePress() {
   
    onPress && onPress();
    
  }

  function handlePressIcon(){
    Haptics.selectionAsync();
    onPressIcon && onPressIcon();
  }
  function animateIcon(icon, color) {
    setAnimationIcon(icon);
    setAnimationColor(color);
    scaleAnimation.value = 1.6;
    setTimeout(() => (scaleAnimation.value = 0), 1000);
  }

  //console.log("Post:", post);
  
  return (
    <>
      <Pressable
        style={[
          styles.container,
          containerStyle,
          curved && styles.curved,
          curved && curvedStyle,
        ]}
        onPress={handlePress}
      >
        <View style={styles.nameContainer}>
          <View style={styles.userData}>
            <UserImage dimensions={40} source={post?.userImage} />
            <TextCommonsMedium style={styles.name}>
              {post?.name}
            </TextCommonsMedium>
            <TextCommonsRegular style={styles.username}>
              @{post?.username || post?.user}
            </TextCommonsRegular>
          </View>
          {borrar && (
            <Pressable onPress={handlePressIcon}>
              <Ionicons style={styles.verMas} name={iconPost} />
            </Pressable>
          )}
          {(!borrar && isReportable && !admin) &&(
            <View style = {styles.options}>
            <TouchableOpacity onPress={() => {setShowMenu(!showMenu); console.log("Menu toggled:", !showMenu);}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={Colors.darkGray}
              />
            </TouchableOpacity>
            {(showMenu)&&(
              <ContextualMenu
                  isReportPost={true}
                  isReportUser={true}
                  onReportPost={()=>handleReportPost("POST", post?.id)}
                  onReportUser={()=>handleReportUser("USER",post?.username || post?.user)}
              />
            )}
            </View>
          )}
          {(!borrar && admin && handleBanPost) &&(
            <View style = {styles.options}>
            <TouchableOpacity onPress={() => {setShowAdmin(!showAdmin); console.log("admin toggled:", !showAdmin);}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={Colors.darkGray}
              />
            </TouchableOpacity>
            {(showAdmin)&&(
              <ContextualMenu
                  isBanPost={true}
                  onBanPost={()=>handleBanPost(post?.id)}   
                  onResolvePost={()=>handleResolvePost(post?.id)}
               />
            )}
            </View>
          )}
        </View>
        <TextCommonsRegular style={styles.content}>
          {post?.content || post?.body}
        </TextCommonsRegular>
        <ImagesContainer
          images={post?.images}
          postInfo={{
            likes: post?.likes,
            comments: post?.comments_number,
            faved: post?.faved,
            liked: post?.liked,
            id: post?.id,
          }}
        />
        <View style={styles.tagsContainer}>
          {post?.tags && post.tags.length > 0 ? (
            post?.tags.map((tag, index) => <TagItem key={index}>{tag}</TagItem>)
          ) : (
            <TextCommonsMedium style={styles.noTagsText}>
              No hay etiquetas disponibles.
            </TextCommonsMedium>
          )}
        </View>
        <View style={styles.infoContainer}>
        <TextCommonsRegular style={styles.date}>
          {post?.date
            ? post.date
            : post?.created_at
            ? post.created_at
            : "Fecha no disponible"}
        </TextCommonsRegular>

          <PostInfoContainer
            comments={post?.comments_number}
            likes={post?.likes}
            faved={post?.faved}
            liked={post?.liked}
            id={post?.id}
            onPressIcon={animateIcon}
          />
        </View>
      </Pressable>
      {!curved && <Divider />}
      <Animated.View style={[styles.animatedIcon, animationStlye]}>
        <Ionicons name={animationIcon} size={30} color={animationColor} />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: postBackgroundColor,
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: "relative",
  },

  curved: {
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userData: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  options: {
    flexDirection: "row",
    //marginLeft:-50,
    alignItems: "center",
    //width: "100%",
    marginTop: 7,
    //zIndex: 1500, // Asegura que el menú esté por delante
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.mJordan,
  },

  username: {
    fontSize: 14,
    color: Colors.mJordan,
    fontWeight: "400",
  },

  content: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.mJordan,
    marginTop: 6,
  },

  date: {
    fontSize: 12,
    fontWeight: "400",
    color: "grey",
  },

  noTagsText: {
    color: "grey",
  },

  verMas: {
    fontSize: 20,
  },

  animatedIcon: {
    position: "absolute",
    top: "75",
    left: "45%",
  },
  menuContainer: {
    position: "absolute",
    top: 24, // Ajusta según tu diseño
    right: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000, // Asegura que el menú esté por encima de otros elementos
  },
  
});
