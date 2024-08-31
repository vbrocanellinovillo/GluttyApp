import { useSelector } from "react-redux";
import { ConsultGeneralInfo } from "./ConsultGeneralInfo";
import { getBranch } from "../../../../services/commerceService";

export async function ViewBranch({route})  {
    id = route.params.branch.id;
    const token = useSelector((state) => state.auth.accessToken);
    branch = await getBranch(id, token);
    console.log("branch: ", branch);
    
    return <ConsultGeneralInfo branch={branch}></ConsultGeneralInfo>
};