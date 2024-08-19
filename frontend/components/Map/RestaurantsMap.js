import MapView, { Marker } from "react-native-maps";

export default function RestaurantsMap({ restaurants, location }) {
  // capaz que lo mejor seria que restaurants sea un array de todas las branchs que hay
  // si cada restauran es una branch, armo el marker con restaurant.coordinates
  const userLocation = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <MapView region={userLocation}>
      {restaurants &&
        restaurants.map((restaurant) => (
          <Marker coordinate={restaurant.coordinates} />
        ))}
    </MapView>
  );
}
