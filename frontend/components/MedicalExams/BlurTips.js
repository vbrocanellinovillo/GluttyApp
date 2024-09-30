import GluttyTipsContainer from "./GluttyTipsContainer";
import BlurContainer from "../UI/BlurContainer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGluttyTips } from "../../services/medicalExamService";

export default function BlurTips({ visible, onDismiss }) {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (visible) {
      fetchTips();
    } else {
      setTips([]);
    }
  }, [visible]);

  async function fetchTips() {
    setIsLoading(true);
    try {
      const data = await getGluttyTips(token);
      setTips(data.glutty_tips);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setTips([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BlurContainer visible={visible} onDismiss={onDismiss}>
      <GluttyTipsContainer
        tips={tips}
        onDismiss={onDismiss}
        isError={isError}
        isLoading={isLoading}
      />
    </BlurContainer>
  );
}
