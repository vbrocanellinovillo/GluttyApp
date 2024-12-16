import { useEffect, useState } from "react";
import BranchesContainer from "../../../components/Branch/BranchesContainer";
import { getBranches } from "../../../services/commerceService";
import { useDispatch, useSelector } from "react-redux";
import GluttyModal from "../../../components/UI/GluttyModal";
import { commerceActions } from "../../../context/commerce";
import { sleep } from "../../../utils/utilFunctions";
import { useIsFocused } from "@react-navigation/native";
import { useRefresh } from "../../../hooks/useRefresh";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";


export default function Branches() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isFocused = useIsFocused(); 
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      getData(); // Llama a la función para actualizar los posts
    }
  }, [isFocused]);


  async function getData() {
    setIsLoading(true);
    try {
      const data = await getBranches(token);
      dispatch(commerceActions.setBranches({ branches: data.branches }));
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
      <BranchesContainer isLoading={isLoading} isError={isError} getData={getData} />
    )}

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 25,
      },
    });