import ScreenCenter from "../../components/UI/ScreenCenter";
import Button from "../../components/UI/Controls/Button";
import { Colors } from "../../constants/colors";
import {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import SmileGlutty from "../../components/UI/SVGGlutty/SmileGlutty";
import RefreshScreen from "../../components/UI/RefreshScreen";

export default function Home() {
  const y = useSharedValue(0);
  const scaleY = useSharedValue(1);

  const animatedProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateY: withSpring(y.value, { damping: 18 }) },
        { scaleY: withSpring(scaleY.value, { damping: 18 }) },
      ],
    };
  });

  function greet() {
    scaleY.value = -1;
    y.value = 750;
    setTimeout(() => {
      y.value = 0;
      scaleY.value = 1;
    }, 2000);
  }

  return (
    <ScreenCenter>
      <SmileGlutty
        width={300}
        height={300}
        animatedLeftArm={animatedProps}
        animatedRightArm={animatedProps}
      />
      <Button backgroundColor={Colors.humita} onPress={greet}>
        Levantar brazos
      </Button>
    </ScreenCenter>
  );
}
