import { Image, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { thumbGlutty } from "../../constants/glutty";

export default function RestaurantsMap({ restaurants, location }) {
  // capaz que lo mejor seria que restaurants sea un array de todas las branchs que hay
  // si cada restauran es una branch, armo el marker con restaurant.coordinates
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
          <Marker key={Math.random()} coordinate={restaurant.coordinates}>
            <Image
              source={{ uri: thumbGlutty }}
              style={{ height: 50, width: 50 }}
            />
          </Marker>
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});