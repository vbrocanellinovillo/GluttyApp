import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function ViewPostByIDSkeleton() {
  const comments = Array.from({ length: 2 }, (_, index) => `Comment ${index + 1}`);

  return (
    <View style={styles.container}>
     <View style={styles.post}> 
      {/* Header con ícono de perfil y nombre de usuario */}
      <View style={styles.header}>
        <Skeleton circle width={50} height={50} />
        <View style={styles.userInfo}>
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={16} style={styles.username} />
        </View>
      </View>

      {/* Contenido del post */}
      <View style={styles.content}>
        <Skeleton width="80%" height={20} />
        <Skeleton width="90%" height={20} />
        {/* <Skeleton width="75%" height={20} style={styles.extraContent} /> */}
      </View>

      {/* Imágenes del post */}
      <View style={styles.imagesContainer}>
        <Skeleton width="48%" height={150} style={styles.imageSkeleton} />
        <Skeleton width="48%" height={150} style={styles.imageSkeleton} />
      </View>

      {/* Fecha y opciones de interacción */}
      <View style={styles.footer}>
        <Skeleton width={150} height={14} style={styles.date} />
        <View style={styles.interactionIcons}>
          <Skeleton circle width={40} height={30} />
          <Skeleton circle width={40} height={30} />
          <Skeleton circle width={40} height={30} />
        </View>
      </View>
      </View>
      {/* Sección de comentarios */}
      <View style={styles.commentsSection}>
        {comments.map((comment) => (
          <View key={comment} style={styles.comment}>
            <Skeleton circle width={40} height={40} />
            <View style={styles.commentContent}>
              <Skeleton width={120} height={20} />
              <Skeleton width="90%" height={12} style={styles.commentText} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
    
    //borderWidth: 1,
  },

  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  post:{
    marginBottom: 10,
    //borderWidth: 1
  },
  userInfo: {
    gap: 4,
    marginBottom: 10,
  },

  username: {
    marginTop: 4,
  },

  content: {
    marginTop: 20,
    gap: 8,
    marginBottom: 20,
  },

  extraContent: {
    marginTop: 8,
    marginBottom: 20,
  },

  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  imageSkeleton: {
    borderRadius: 10,
    marginBottom: 30,
    
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    marginTop: 4,
  },

  interactionIcons: {
    flexDirection: "row",
    gap: 10,
  },

  commentsSection: {
    marginTop: 25,
    gap: 40,
  },

  comment: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  commentContent: {
    flex: 1,
    gap: 8,
  },

  commentText: {
    marginTop: 4,
  },
});
