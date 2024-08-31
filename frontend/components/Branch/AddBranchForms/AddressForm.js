import { StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../../UI/Forms/DismissKeyboadContainer";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import FormButtonsGroup from "../../UI/Controls/FormButtonsGroup";
import { API_KEY_GOOGLE } from "@env";

export default function AddressForm({ onBack, onNext }) {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  const [error, setError] = useState(false);

  function getAddress(data, details) {
    setError(false);
    setAddress(details.formatted_address);
    const location = details.geometry.location;

    setCoordinates({
      latitude: location.lat,
      longitude: location.lng,
    });
  }

  function handleSubmit() {
    if (address.trim() === "") {
      setError(true);
      return;
    }

    onNext(address, coordinates);
  }
  
  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          fetchDetails
          query={{
            language: "es",
            key: "AIzaSyCR7NE3OD2rkoQ18WF6B-ZLy9dkZIxoh2U"
          }}
          onPress={getAddress}
          textInputProps={{
            placeholder: "Ingrese la dirección de la sucursal",
            placeholderTextColor: error ? Colors.redError : Colors.mJordan,
          }}
          styles={{
            textInputContainer: [
              styles.inputContainer,
              { borderColor: error ? Colors.redError : Colors.mJordan },
            ],
            textInput: styles.input,
          }}
          renderRightButton={() => (
            <Ionicons name="search" size={20} color={Colors.mJordan} />
          )}
        />
        <FormButtonsGroup
          prev="Anterior"
          next="Siguiente"
          onPrev={onBack}
          onNext={handleSubmit}
        />
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 50,
    paddingBottom: 100,
  },

  inputContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 6,
  },

  input: {
    alignItems: "center",
    paddingTop: 10,
  },
});
