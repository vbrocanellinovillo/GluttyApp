import GraphicSkeleton from "../UI/Loading/GraphicSkeleton";
import BlurError from "../UI/BlurError";

export default function BlurGraphic({
  width,
  height,
  children,
  style,
  intensity = 30,
}) {
  const blurBackdrop = <GraphicSkeleton width={width} height={height} />;

  return (
    <BlurError
      backdrop={blurBackdrop}
      style={style}
      intensity={intensity}
    >
      {children}
    </BlurError>
  );
}

