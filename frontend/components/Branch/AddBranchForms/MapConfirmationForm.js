import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import TextCommonsMedium from "../../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../../constants/colors";
import TextCommonsRegular from "../../UI/FontsTexts/TextCommonsRegular";
import FormButtonsGroup from "../../UI/Controls/FormButtonsGroup";
import { useState } from "react";

export default function MapConfirmationForm({
  address,
  coordinates,
  onCancel,
  onSave,
}) {
  const mapRegion = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [marker, setMarker] = useState(coordinates);

  function dragMarker(event) {
    const newCoordinate = event._dispatchInstances.memoizedProps.coordinate;
    console.log(event._dispatchInstances);

    setMarker({
      latitude: newCoordinate.latitude,
      longitude: newCoordinate.longitude,
    });
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
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
            {address}
          </TextCommonsRegular>
        </View>
        <FormButtonsGroup
          prev="Cancelar"
          next="Confirmar"
          onPrev={onCancel}
          onNext={onSave}
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
