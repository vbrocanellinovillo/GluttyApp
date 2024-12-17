import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddBranchButton from "./AddBranchButton";
import BranchesList from "./BranchesList";
import BranchesSkeleton from "../UI/Loading/BranchesSkeleton";
import NoBranches from "./NoBranches";
import ErrorFetchingBranches from "./ErrorFetchingBranches";
import { useRefresh } from "../../hooks/useRefresh";

export default function BranchesContainer({ isLoading, isError, getData }) {
  const branchesFromRedux = useSelector((state) => state.commerce.branches);
  const [branches, setBranches] = useState(branchesFromRedux);

  // Sincroniza el estado local si `branchesFromRedux` cambia
  useEffect(() => {
    setBranches(branchesFromRedux);
  }, [branchesFromRedux]);

  const handleUpdateBranches = (updatedBranches) => {
    setBranches(updatedBranches); // Actualiza el estado local
  };

  let content;

  if (isLoading) {
    content = <BranchesSkeleton />;
  } else if (isError) {
    content = <ErrorFetchingBranches />;
  } else if (branches && branches.length > 0) {
    content = (
      <BranchesList
        branches={branches}
        onUpdateBranches={handleUpdateBranches} getData={getData}// Pasar el callback
      />
    );
  } else {
    content = <NoBranches />;
  }

  return (
    <>
      <View style={styles.container}>
        <AddBranchButton />
        {content}
      </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 35,
    marginTop: 40,
    paddingBottom: 200,
  },
});