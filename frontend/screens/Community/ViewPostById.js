import { useCallback, useState } from "react";
import { getPostById } from "../../services/communityService";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AddComment from "../../components/Community/AddComment";
import PostItem from "../../components/Community/PostItem";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Comment from "../../components/Community/Comment";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../../components/UI/FontsTexts/TextCommonsRegular";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";

export default function ViewPostById({ route }) {
  const [post, setPost] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setIsError] = useState(false);

  const id = route.params?.id;
  const token = useSelector((state) => state.auth.accessToken);

  useFocusEffect(
    useCallback(() => {
      const cargarPost = async () => {
        setIsLoading(true);
        try {
          const selectedPost = await getPostById(id, token);
          setIsLoading(false);
          console.log("posteo consulta:", selectedPost);
          setPost(selectedPost);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      cargarPost();
    }, [id, token])
  );

  if (isLoading) {
    return <LoadingGlutty visible={isLoading} />
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 13, paddingBottom: 150 }}>
        {/* Mostrar el post */}
        <PostItem post={post} iconPost="trash-outline" />

        {/* Mostrar los comentarios */}
        {post?.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        ) : (
          <TextCommonsRegular style={styles.noComments}>
            No hay comentarios aún.
          </TextCommonsRegular>
        )}

        {/* Agregar un nuevo comentario */}
        <AddComment id_post={id} />
      </ScrollView>
  );
}

const styles = StyleSheet.create(
  {
  noComments: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    fontSize: 16,
    color: Colors.mJordan,

 }
});