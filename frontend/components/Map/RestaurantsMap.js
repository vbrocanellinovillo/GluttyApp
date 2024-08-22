import { Image, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { thumbGlutty } from "../../constants/glutty";

export default function RestaurantsMap({ restaurants, location }) {
  const userLocation = {
    latitude: location.latitude ? location.latitude : -31.4262,
    longitude: location.longitude ? location.longitude : -64.1888,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <MapView region={userLocation} style={styles.map}>
      {restaurants &&
        restaurants.map((restaurant) => (
          <Marker key={restaurant.id} coordinate={restaurant.coordinate}>
            <Image source={{ uri: thumbGlutty }} style={styles.gluttyMarker} />
          </Marker>
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  gluttyMarker: {
    height: 75,
    width: 75,
  },
});
