import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import PostItem from "../Community/PostItem";
import { useSharedValue } from "react-native-reanimated";
import { useRef } from "react";
import { Colors } from "../../constants/colors";

export default function PostCarousel({ posts, height = 800, onPress }) {
    const progress = useSharedValue(0);
    const carouselRef = useRef();

    const onPressPagination = (index) => {
        carouselRef.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={[styles.container, { height }]}>
            <Carousel
                ref={carouselRef}
                width={300}
                pagingEnabled
                data={posts}
                scrollAnimationDuration={800}
                onProgressChange={progress}
                renderItem={({ post }) => <PostItem
                    post={post}
                    containerStyle={styles.postContainer}
                    curved={true}
                    iconPost="close-outline" // Cambiar ícono si se necesita
                    onPress={onPress}
                />
                }
                mode="horizontal-stack"
                modeConfig={{
                    moveSize: 10,
                    stackInterval: 500,
                    scaleInterval: 0.08,
                    rotateZDeg: 60,
                    snapDirection: "left",
                }}
            />
             <Pagination.Basic
                progress={progress}
                data={posts}
                activeDotStyle={styles.activeDot}
                dotStyle={styles.dotStyle}
                containerStyle={styles.dotsContainer}
                onPress={onPressPagination}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        alignItems: "center",
    },

    dotsContainer: {
        gap: 15,
        marginTop: -30,
        height: 2,
    },

    activeDot: {
        backgroundColor: Colors.locro,
    },

    dotStyle: {
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 50,
    },
});
