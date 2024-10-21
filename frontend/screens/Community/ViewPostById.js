import { useCallback, useState } from "react";
import { getPostById } from "../../services/communityService";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AddComment from "../../components/Community/AddComment";
import PostItem from "../../components/Community/PostItem";
import { ScrollView, View, Text } from "react-native";
import Comment from "../../components/Community/Comment";

export default function ViewPostById({ route }) {
  const [post, setPost] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  const id = route.params?.id;
  const token = useSelector((state) => state.auth.accessToken);

  useFocusEffect(
    useCallback(() => {
      const cargarPost = async () => {
        try {
          setIsLoading(true);
          const selectedPost = await getPostById(id, token);
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
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          No hay comentarios aún.
        </Text>
      )}

      {/* Agregar un nuevo comentario */}
      <AddComment id_post={id} />
    </ScrollView>
  );
}
