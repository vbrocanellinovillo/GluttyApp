import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../components/UI/GluttyModal";
import { useFocusEffect } from "@react-navigation/native";
import { getMapPoints, getSearchData } from "../../../services/commerceService";
import InfoMap from "../../../components/Map/InfoMap";
import MapSearch from "../../../components/Map/MapSearch";
import { useQuery } from "@tanstack/react-query";

export default function Map() {
  const [locationPermissions, requestLocationPermissions] =
    useForegroundPermissions();

  const token = useSelector((state) => state.auth.accessToken);

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, serError] = useState("");

  const [mapData, setMapData] = useState(undefined);

  // Search
  const [searchData, setSearchData] = useState([]);
  const [hideSearchResults, setHideSearchResults] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  /* const { data: searchData, refetch } = useQuery({
    queryKey: ["map-search", searchData],
    queryFn: (searchTerm, separatedKitchen, onlyTakeAway, token, { signal }) =>
      getSearchData(),
    enabled: false,
  }); */

  const [newRegion, setNewRegion] = useState(undefined);

  function closeModalHandler() {
    setShowModal(false);
    serError("");
  }

  function handleHideSearchResults() {
    setHideSearchResults(true);
  }

  function handleShowSearchResults() {
    setHideSearchResults(false);
  }

  const [location, setLocation] = useState({
    latitude: -31.4262,
    longitude: -64.1888,
  }); // ubicación por defecto si no se conceden los permisos

  useEffect(() => {
    async function locate() {
      const currentPermissions = await getForegroundPermissionsAsync();

      if (!currentPermissions.granted) {
        const permissionResponse = await requestLocationPermissions();

        if (!permissionResponse.granted) {
          return;
        }
      }

      const userLocation = await getCurrentPositionAsync();
      const { latitude, longitude } = userLocation.coords;

      setLocation({ latitude, longitude });
    }

    locate();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getMapData() {
        if (mapData) return;
        try {
          setisloading(true);
          const branches = await getMapPoints(token);
          setMapData(branches);
          setIsError(false);
        } catch (error) {
          setIsError(true);
          serError(
            "Ocurrio un error al cargar el mapa. Por favor intente de nuevo más tarde"
          );
          setShowModal(true);
        } finally {
          setisloading(false);
        }
      }

      getMapData();
    }, [token])
  );

  async function handleSearch(
    searchTerm,
    separatedKitchen,
    onlyTakeAway,
    signal
  ) {
    if (searchTerm.trim() !== "") {
      setIsSearching(true);
    }

    try {
      const data = await getSearchData(
        searchTerm,
        separatedKitchen,
        onlyTakeAway,
        token,
        signal
      );

      const branches = data.branches;

      const mapData = branches.map((branch) => ({
        ...branch,
        coordinate: {
          latitude: branch.latitude,
          longitude: branch.longitude,
        },
      }));

      if (searchTerm.trim().length === 0) {
        setSearchData([]);
      } else {
        setSearchData(branches);
      }

      setMapData(mapData);
      setIsError(false);
      setIsSearching(false);
    } catch (error) {
      if (error.message.includes("AbortError")) {
        return;
      }

      setIsSearching(false);
      setIsError(true);
      serError(
        "Ocurrio un error en la busqueda. Por favor intente de nuevo más tarde"
      );
      setShowModal(true);
    }
  }

  function changeLocation(location) {
    if (!location) return;

    setNewRegion(location);
    handleHideSearchResults();
  }

  return (
    <>
      <LoadingGlutty visible={isloading} />
      <GluttyModal
        isError={isError}
        message={error}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <>
        <MapSearch
          onSearch={handleSearch}
          searchData={searchData}
          hideResults={hideSearchResults}
          handleHideSearchResults={handleHideSearchResults}
          handleShowSearchResults={handleShowSearchResults}
          onChangeLocation={changeLocation}
          isSearching={isSearching}
        />
        <InfoMap
          location={location}
          branches={mapData}
          onPress={handleHideSearchResults}
          newRegion={newRegion}
        />
      </>
    </>
  );
}
