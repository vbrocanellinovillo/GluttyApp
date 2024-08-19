import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import TextCommonsMedium from "../../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../../constants/colors";
import TextCommonsRegular from "../../UI/FontsTexts/TextCommonsRegular";
import FormButtonsGroup from "../../UI/Controls/FormButtonsGroup";
import { useRef, useState } from "react";

export default function MapConfirmationForm({
  address,
  coordinates,
  onCancel,
  onSave,
}) {
  const mapRegion = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const [marker, setMarker] = useState(coordinates);
  const [selectedAddress, setSelectedAddress] = useState(address);

  const mapRef = useRef();

  async function dragMarker(event) {
    const newCoordinate = event.nativeEvent.coordinate;
    setMarker(newCoordinate);

    const newAddress = await mapRef.current?.addressForCoordinate(
      newCoordinate
    );

    const formattedAddress =
      newAddress.name +
      ", " +
      newAddress.postalCode +
      " " +
      newAddress.locality +
      ", " +
      newAddress.country;

    setSelectedAddress(formattedAddress);
  }

  function confirm() {
    onSave(marker, selectedAddress);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} ref={mapRef}>
        <Marker coordinate={marker} draggable onDragEnd={dragMarker} />
      </MapView>
      <View style={styles.bottomOptions}>
        <TextCommonsMedium style={styles.title}>
          Confirma tu ubicación
        </TextCommonsMedium>
        <View style={styles.ubicationContainer}>
          <TextCommonsMedium style={styles.ubicationTitle}>
            Ubicación
          </TextCommonsMedium>
          <TextCommonsRegular style={styles.ubication}>
            {selectedAddress}
          </TextCommonsRegular>
        </View>
        <FormButtonsGroup
          prev="Cancelar"
          next="Confirmar"
          onPrev={onCancel}
          onNext={confirm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  map: {
    flex: 5,
    marginBottom: -30,
  },

  bottomOptions: {
    flex: 2,
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 35,
  },

  title: {
    fontSize: 30,
    color: Colors.mJordan,
  },

  ubicationContainer: {
    marginTop: 20,
  },

  ubicationTitle: {
    fontSize: 24,
    color: "#aaa",
  },

  ubication: {
    fontSize: 16,
    color: Colors.mJordan,
  },
});
