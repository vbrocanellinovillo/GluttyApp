import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PostsList from "../../../components/Community/PostsList";
import NoPosts from "../../../components/Community/NoPosts";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { PAGE_SIZE } from "../../../constants/community";
import { useEffect } from "react";


const PostsAdmin = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const isFocused = useIsFocused(); // Verifica si la pantalla está enfocada
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;
  
  const data = [{"comments": null, 
    "comments_number": 1, 
    "content": "No me gusta esta comunidad", 
    "date": "20:42 - 04/11/2024", 
    "faved": true, 
    "id": 98, 
    "images": [], 
    "liked": true, 
    "likes": 2, 
    "name": 
    "Francisco Menendez", 
    "tags": [], 
    "userImage": "https://res.cloudinary.com/dc7sftc2n/image/upload/v1728956435/h7x59zzkszwvh2krjilq.jpg", 
    "username": "fran"},
    // {"comments": null, 
    //   "comments_number": 1, 
    //   "content": "La capke que lugar del biennn", 
    //   "date": "20:42 - 04/11/2024", 
    //   "faved": true, 
    //   "id": 98, 
    //   "images": [], 
    //   "liked": true, 
    //   "likes": 2, 
    //   "name": 
    //   "Francisco Menendez", 
    //   "tags": ["Recomendaciones", "Rico", "Meriendas"], 
    //   "userImage": "https://res.cloudinary.com/dc7sftc2n/image/upload/v1728956435/h7x59zzkszwvh2krjilq.jpg", 
    //   "username": "fran"},
    // {"comments": null, 
    //   "comments_number": 1, 
    //   "content": "La capke que lugar del biennn", 
    //   "date": "20:42 - 04/11/2024", 
    //   "faved": true, 
    //   "id": 100, 
    //   "images": [], 
    //   "liked": true, 
    //   "likes": 2, 
    //   "name": 
    //   "Francisco Menendez", 
    //   "tags": ["Recomendaciones", "Rico", "Meriendas"], 
    //   "userImage": "https://res.cloudinary.com/dc7sftc2n/image/upload/v1728956435/h7x59zzkszwvh2krjilq.jpg", 
    //   "username": "fran"}
    ];

  useEffect(() => {
    if (isFocused) {
      setPage(1); // Reinicia la página al entrar
      fetchMyPosts(); // Llama a la función para actualizar los posts
    }
  }, [isFocused]);

  async function fetchMyPosts() {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setIsLoading(true);
    }

    try {
      //const data = await getReportedPosts(token, page, pageSize);

      if (data) {
        setPosts((prevPosts) => (isFirstPage ? data : [...prevPosts, ...data]));
        setHasNextPage(data?.length === pageSize);
      }
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <PostsList
        posts={posts}
        //hasNextPage={hasNextPage}
        //onPageChange={changePage}
        onRefresh={fetchMyPosts}
        isError={isError}
        isLoading={isLoading}
        errorStyle={styles.errorPosts}
        NoContentComponent={() => (
          <NoPosts>¡No hubo nuevos posteos reportados!</NoPosts>
        )}
      />
  );
};

const styles = StyleSheet.create({

});

export default PostsAdmin;
