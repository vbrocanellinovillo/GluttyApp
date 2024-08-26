import { useEffect, useState } from "react";
import BranchesContainer from "../../../components/Branch/BranchesContainer";
import { getBranches } from "../../../services/commerceService";
import { useDispatch, useSelector } from "react-redux";
import GluttyModal from "../../../components/UI/GluttyModal";
import { commerceActions } from "../../../context/commerce";
import { sleep } from "../../../utils/utilFunctions";

export default function Branches() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        await sleep(5000);
        const data = await getBranches(token);
        dispatch(commerceActions.setBranches({ branches: data.branches }));
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return <BranchesContainer isLoading={isLoading} isError={isError} />;
}
