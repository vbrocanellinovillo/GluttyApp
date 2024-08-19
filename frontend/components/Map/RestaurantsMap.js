import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function RestaurantsMap({ restaurants, location }) {
  // capaz que lo mejor seria que restaurants sea un array de todas las branchs que hay
  // si cada restauran es una branch, armo el marker con restaurant.coordinates
  const userLocation = {
    latitude: location.latitude ? location.latitude : -31.4135,
    longitude: location.longitude ? location.longitude : -64.18105,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <MapView region={userLocation} style={styles.map}>
      {restaurants &&
        restaurants.map((restaurant) => (
          <Marker coordinate={restaurant.coordinates} />
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
