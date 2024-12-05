import { FlatList } from "react-native";
import PostItem from "./PostItem";
import PaginationFooter from "../UI/Loading/PaginationFooter";
import {
  COMMUNITY_BOTTOM_INSET,
  communityPaginationFooterStyle,
} from "../../constants/community";
import PostsSkeleton from "../UI/Loading/PostsSkeleton";
import ErrorPosts from "./ErrorPosts";
import { useNavigation } from "@react-navigation/native";

export default function PostsList({
  posts = [],
  style,
  curved,
  onPageChange,
  hasNextPage,
  footerStyle,
  isLoading,
  isError,
  NoContentComponent,
  errorStyle,
  onRefresh,
  bottomInset,
  ...props
}) {
  const navigation = useNavigation();

  if (isLoading) {
    return <PostsSkeleton style={style} curved={curved} />;
  } else if (isError) {
    return (
      <ErrorPosts
        style={errorStyle}
        postsStyle={style}
        curved={curved}
        onRefresh={onRefresh}
      />
    );
  } else if (posts.length === 0) {
    return <NoContentComponent />;
  }

  return (
    <>
      {posts.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <PostItem
              post={item}
              curved={curved}
              onPress={() =>
                navigation.navigate("ViewPostById", { id: item.id })
              }
              {...props}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style}
          onEndReached={onPageChange}
          ListFooterComponent={
            <PaginationFooter
              hasNextPage={hasNextPage}
              style={[communityPaginationFooterStyle, footerStyle]}
            />
          }
          contentInset={{ bottom: bottomInset || COMMUNITY_BOTTOM_INSET }}
        />
      )}
    </>
  );
}
