import { StyleSheet, View } from "react-native"
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { PAGE_SIZE } from "../../../constants/community";
import PostsList from "../../../components/Community/PostsList";
import NoPosts from "../../../components/Community/NoPosts";
import { FAB, Portal, Provider } from "react-native-paper";
import { Colors } from "../../../constants/colors";


export default function ViewPostsReportedUser({route}) {
    const token = useSelector((state) => state.auth.accessToken);
    const isFocused = useIsFocused(); 
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const pageSize = PAGE_SIZE;
    const [isFABOpen, setIsFABOpen] = useState(false);

    console.log(route);
    const {username} = route.params;
    
    const data = [{"comments": null, 
        "comments_number": 1, 
        "content": "La capke que lugar del biennn", 
        "date": "20:42 - 04/11/2024", 
        "faved": true, 
        "id": 98, 
        "images": [], 
        "liked": true, 
        "likes": 2, 
        "name": 
        "Lionel Messi", 
        "tags": ["Recomendaciones", "Rico", "Meriendas"], 
        "userImage": "https://res.cloudinary.com/dc7sftc2n/image/upload/v1728956435/h7x59zzkszwvh2krjilq.jpg", 
        "username": "messi"},]


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
            //const userReportedPosts = await getReportedPosts(username, token, page, pageSize);
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

    function blockUser() {
        console.log("Usuario bloqueado");
        // Lógica para bloquear al usuario
      }
    
      function unblockUser() {
        console.log("Usuario desbloqueado");
        // Lógica para desbloquear al usuario
      }


    return (
    <Provider>
        <View>
            {/* Aquí va el contenido para ver las publicaciones reportadas por el usuario */}
            <TextCommonsMedium style={styles.titulo}>Publicaciones del usuario reportado: {username} </TextCommonsMedium>
            <PostsList
                posts={posts}
                //hasNextPage={hasNextPage}
                //onPageChange={changePage}
                onRefresh={fetchMyPosts}
                isError={isError}
                isLoading={isLoading}
                errorStyle={styles.errorPosts}
                NoContentComponent={() => (
                <NoPosts>¡No hubo nuevos posteos reportados!</NoPosts>)}
              />
            <Portal>
                <FAB.Group
                    open={isFABOpen}
                    icon="dots-horizontal" // Cambiar por el ícono que desees
                    actions={[
                    {
                        icon: "block-helper", // Ícono para "Bloquear usuario"
                        label: "Bloquear usuario",
                        onPress: blockUser,
                        color: Colors.humita,
                        labelTextColor: Colors.mJordan
                    },
                    {
                        icon: "check", // Ícono para "No bloquear usuario"
                        label: "Anular reporte",
                        onPress: unblockUser,
                        color: Colors.humita,
                        labelTextColor: Colors.mJordan

                    },
                    ]}
                    onStateChange={({ open }) => setIsFABOpen(open)}
                    visible={true}
                    style={styles.botonFlotante}
                    fabStyle={{ backgroundColor: Colors.locro }}
                    rippleColor="transparent"
                />
            </Portal>
        </View>
    </Provider>
    )
}

const styles = StyleSheet.create({
    titulo: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    botonFlotante: {
        position: "absolute", 
        bottom: 80, 
        //right: 5
        
    },
});