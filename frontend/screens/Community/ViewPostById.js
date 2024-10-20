import { useCallback, useEffect, useState } from "react";
import { getPostById } from "../../services/communityService";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AddComment from "../../components/Community/AddComment";
import { Text } from "react-native";
import PostInfo from "../../components/Community/PostInfo";
import PostItem from "../../components/Community/PostItem";

export default function ViewPostById({route}) {
    const [post, setPost] = useState(undefined);
    const [isloading, setIsLoading] = useState(false);
    const [error, setIsError] = useState(false);

    const id = route.params?.id;
    const token = useSelector((state) => state.auth.accessToken);
    console.log("id", id);
    console.log("token", token);
    
    useFocusEffect(
        useCallback(() => {
          const cargarPost = async () => {
            try {
              setIsLoading(true);
              console.log("entra")
              const selectedPost = await getPostById(id, token);
              console.log("posteo consulta:", selectedPost);
              setPost(selectedPost);
            } catch (error) {
              setIsError(true);
            } finally {
              setIsLoading(false);
            }
          }

           cargarPost();
           
        }, [id, token])
      );

    return (
        <>
        <PostItem post={post} iconPost="trash-outline"></PostItem>
        <AddComment id_post={id}/></>
    );
};