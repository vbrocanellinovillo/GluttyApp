// Inestable por ahora

/* import {
  Svg,
  Defs,
  Path,
  G,
  Image,
  Filter,
  Ellipse,
  Text,
  TSpan,
  FeOffset,
  FeGaussianBlur,
  FeFlood,
  FeComposite,
  FeBlend,
  Mask
} from "react-native-svg";

export default function GluttyImageIcon() {
  return (
    <Svg
      id="Capa_2"
      data-name="Capa 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460.21 457.21"
    >
      <Defs>
        <Filter id="drop-shadow-1" filterUnits="userSpaceOnUse">
          <FeOffset dx="8.3" dy="0" />
          <FeGaussianBlur result="blur" stdDeviation="2.08" />
          <FeFlood flood-color="#6d552e" flood-opacity=".3" />
          <FeComposite in2="blur" operator="in" />
          <FeComposite in="SourceGraphic" />
        </Filter>
        <Filter id="drop-shadow-2" filterUnits="userSpaceOnUse">
          <FeOffset dx="4.15" dy="2.08" />
          <FeGaussianBlur result="blur-2" stdDeviation="0" />
          <FeFlood flood-color="#6d552e" flood-opacity=".56" />
          <FeComposite in2="blur-2" operator="in" />
          <FeComposite in="SourceGraphic" />
        </Filter>
        <Filter id="drop-shadow-3" filterUnits="userSpaceOnUse">
          <FeOffset dx="2.08" dy="2.08" />
          <FeGaussianBlur result="blur-3" stdDeviation="0" />
          <FeFlood flood-color="#6d552e" flood-opacity=".49" />
          <FeComposite in2="blur-3" operator="in" />
          <FeComposite in="SourceGraphic" />
        </Filter>
        <Filter id="drop-shadow-4" filterUnits="userSpaceOnUse">
          <FeOffset dx="4.15" dy="2.08" />
          <FeGaussianBlur result="blur-4" stdDeviation="2.08" />
          <FeFlood flood-color="#6d552e" flood-opacity=".3" />
          <FeComposite in2="blur-4" operator="in" />
          <FeComposite in="SourceGraphic" />
        </Filter>
        <Filter id="drop-shadow-5" filterUnits="userSpaceOnUse">
          <FeOffset dx="4.15" dy="2.08" />
          <FeGaussianBlur result="blur-5" stdDeviation="2.08" />
          <FeFlood flood-color="#6d552e" flood-opacity=".3" />
          <FeComposite in2="blur-5" operator="in" />
          <FeComposite in="SourceGraphic" />
        </Filter>
        <Filter id="drop-shadow-6" filterUnits="userSpaceOnUse">
          <FeOffset dx="0" dy="2.08" />
          <FeGaussianBlur result="blur-6" stdDeviation="0" />
          <FeFlood flood-color="#6d552e" flood-opacity=".31" />
          <FeComposite in2="blur-6" operator="in" />
          <FeComposite in="SourceGraphic" />
        </Filter>
        <Filter
          id="luminosity-noclip"
          x="230.86"
          y="325.54"
          width="42"
          height="28.8"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood flood-color="#fff" result="bg" />
          <FeBlend in="SourceGraphic" in2="bg" />
        </Filter>
        <Mask
          id="mask"
          x="230.86"
          y="325.54"
          width="42"
          height="28.8"
          maskUnits="userSpaceOnUse"
        >
          <G filter="url(#luminosity-noclip)">
            <Image
              width="175"
              height="120"
              transform="translate(230.86 325.54) scale(.24)"
              xlinkHref={
                "data:image/png;base64,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"
              }
            />
          </G>
        </Mask>
        <Filter
          id="luminosity-noclip-2"
          x="251.26"
          y="153.22"
          width="67.44"
          height="24.96"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood flood-color="#fff" result="bg" />
          <FeBlend in="SourceGraphic" in2="bg" />
        </Filter>
        <Mask
          id="mask-1"
          x="251.26"
          y="153.22"
          width="67.44"
          height="24.96"
          maskUnits="userSpaceOnUse"
        >
          <G filter="url(#luminosity-noclip-2)">
            <Image
              width="281"
              height="104"
              transform="translate(251.26 153.22) scale(.24)"
              xlinkHref={
                "data:image/png;base64,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"
              }
            />
          </G>
        </Mask>
        <Filter
          id="luminosity-noclip-3"
          x="247.18"
          y="190.42"
          width="61.44"
          height="17.52"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood flood-color="#fff" result="bg" />
          <FeBlend in="SourceGraphic" in2="bg" />
        </Filter>
        <Mask
          id="mask-2"
          x="247.18"
          y="190.42"
          width="61.44"
          height="17.52"
          maskUnits="userSpaceOnUse"
        >
          <G filter="url(#luminosity-noclip-3)">
            <Image
              width="256"
              height="73"
              transform="translate(247.18 190.42) scale(.24)"
              xlinkHref={
                "data:image/png;base64,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"
              }
            />
          </G>
        </Mask>
      </Defs>
      <G id="Capa_1-2" data-name="Capa 1">
        <Ellipse
          cx="230.1"
          cy="221.18"
          rx="220.6"
          ry="211.68"
          stroke="#60a8b1"
          fill="#fff"
          strokeWidth={19}
        />
        <G>
          <Path
            d="M133.88,375.11h0c-.1-.09-.19-.17-.28-.25.09.08.18.17.28.25Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M268.52,384.1c8.83-5.33,16.13-12.6,22.74-20.49,11.35-13.56,17.03-29.85,20.8-46.9.66-3,1.86-4.94,3.99-6.48.03-2.75.16-5.5.77-8.2.39-1.74.65-3.66,1.57-5.2.12-4.56.54-8.86,1.3-13.43.31-1.85,1.11-3.84,1.34-5.37.12-.77.34-1.56.57-2.34,2.81-19.94,5.58-38.8,8.03-57.69,1.46-11.2,3.13-22.8-3.01-33.02-2.32-3.85-2.41-6.34-.92-10.08,4.75-11.93,7.97-24.34,10.24-36.99,1.06-5.93-.88-7.65-6.32-5.64-7.5,2.76-14.66,6.5-22.62,7.92-1.48.26-2.72,2.63-4.56.46-1.38-1.63-1.16-3.59-.5-5.01,1.75-3.74,2.44-7.64,2.14-11.61-.67-9.04,1.34-17.63,3.76-26.18,1.44-5.12,2.87-10.25,4.24-15.39.73-2.71,1.05-5.33-2.44-6.5-3.6-1.21-4.62,1.05-5.41,3.88-2.12,7.69-4.33,15.35-6.46,23.05-.58,2.08-.43,4.81-3.37,4.97-9.64.48-17.45,5.4-25.18,10.5-2.42,1.6-3.86,1.41-4.95-1.44-1.71-4.46-4.55-8.23-8.41-10.83-3.15-2.12-2.86-4.16-1.74-7.25,2.12-5.82,3.83-11.79,5.56-17.76.82-2.81-.36-4.73-3.19-5.54-2.96-.84-5.08.9-5.5,3.27-2.88,16.37-11.72,30.34-17.46,45.55-4.31,11.4-4.37,11.38-14.5,5.64-.57-.32-1.16-.63-1.75-.93-9.33-4.89-14.69-1.57-15.08,9.35-.05,1.54-.21,3.09-.27,4.63-.28,6.75-2.77,11.72-9.59,14.12-4.88,1.72-7.85,5.8-10.69,10.2-10.93,16.89-16.08,36.04-21.73,55.02-5.75,19.31-7.89,39.14-7.92,59.18,0,6.6-2.12,9.8-8.42,11.89-17.44,5.79-28.76,17.68-32,36.47-.61,3.55-2.57,5.44-5.46,6.84-6.27,3-11.29,7.55-15.64,12.94-13.31,16.52-11.46,31.72,5.21,42.81,9.5,6.32,20.38,5.07,26.37-2.91,2.53-3.36,3.47-7.43,4.95-11.7,4.97,8.81,8.11,11.17,12.82,9.98,4.65-1.18,9.25-8.01,9.95-14.78,1.27-12.41-1.69-23.35-10.91-32.09-1.48-1.39-2.72-2.74-2.76-5.02-.14-6.46,7.43-16.84,13.57-18.7,2.18-.66,3.14-.45,3.46,2.09.52,4.14,1.36,8.24,2.12,12.34,3.66,19.62,14.16,35.11,28.54,48.15,2.63,2.38,3.69,4.2,1.91,7.82-6.05,12.26-6.86,25.44-4.08,38.49,7.8-.54,15.56-1.43,23.24-2.67-1.94-6.98-2.51-14.18-.32-21.84,1.06-3.72,1.61-7.46,7.14-4.74,8.96,4.38,18.08,6,27.24.14,2.73-1.74,3.77.02,4.2,2.74,1.03,6.58,1.92,13.2,3.43,19.66.13.54.24,1.07.35,1.6,2.49.19,4.97.4,7.45.62-.09-.45-.19-.89-.29-1.34-1.53-6.66-2.32-13.48-4.03-20.01-1.55-5.89.32-8.25,5.41-9.48.38-1.08,1.05-2.01,2.23-1.38,1.44.77,1.25,1.94.16,3.02.16,1.7.33,3.41.5,5.11,3.47,2.27,2.22,5.54,1.76,8.63,1.01,5.4,2.02,10.81,3.03,16.22,2.71.22,5.41.42,8.11.57-2-10.76-4.1-21.49-6.22-32.23-.67-3.36.6-4.96,3.48-6.7ZM321.26,216.59c1.07,1.15.67,2.09-.45,2.91-.42-1.06-.29-2.04.45-2.91ZM314.02,182.83c1,2.46,3.53,4.27,3.04,7.36-1.08-.15-2.18-.3-3.27-.45-.57-.42-1.14-.83-1.71-1.24-.36-2.24-.13-4.28,1.94-5.67ZM309.55,303.33c-.52,1.52-1.27,2.43-2.84,1.09.94-.36,1.89-.72,2.84-1.09ZM105.06,368.44c-1.67-1.71-.57-2.17,1.05-2.37-.35.79-.7,1.59-1.05,2.37ZM142.8,368.46c1.33,1.92,1.37,3.72-.48,5.33-.99-1.88-1.05-3.68.48-5.33ZM126.28,341.9c.62-.5,1.23-.99,1.84-1.49,3.45,1.03,5.71,3.24,6.62,6.81-1.3-.46-2.6-.92-3.9-1.39-1.98-.77-3.68-1.86-4.56-3.94ZM133.88,375.11c-.1-.08-.19-.17-.28-.25-1.25-1.18-1.17-2.44-.01-3.8,1.16,1.26,1.25,2.61.3,4.03h0ZM137.59,380.92c-.54,1.05-1.33,1.72-2.47,1.03-1.26-.76-1.31-2.03-1-3.35,1.16.77,2.31,1.54,3.46,2.32ZM188.27,407.14c-.09-.34-.21-.67-.24-1.01,0-.14.19-.3.29-.45-.01.48-.04.97-.05,1.46ZM245.1,385.75c1.11-1.12,2.47-1.37,3.96-1.18-.81,2.15-2.09,2.66-3.96,1.18ZM255.06,382.41c2.18-2.64,5.18-3.82,8.32-4.72-1.55,3.79-4.6,4.88-8.32,4.72Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M258.36,397.64c-.16-1.7-.33-3.41-.5-5.11-.8-.55-1.6-1.09-2.4-1.64-5.09,1.23-6.97,3.59-5.41,9.48,1.71,6.53,2.5,13.35,4.03,20.01.1.44.19.87.28,1.31,2.93.26,5.86.53,8.78.77-1.01-5.39-2.02-10.79-3.02-16.19-2.64-2.45-2-5.59-1.76-8.63Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M317.06,190.19c-1.08-.15-2.18-.3-3.27-.45-.57-.42-1.14-.83-1.72-1.24-.36-2.24-.13-4.28,1.94-5.67.99,2.46,3.53,4.27,3.04,7.36Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M263.38,377.69c-1.55,3.79-4.6,4.88-8.32,4.72,2.18-2.64,5.18-3.82,8.32-4.72Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M258.36,397.61c-.24,3.05-.88,6.19,1.76,8.63.46-3.1,1.71-6.36-1.76-8.63Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M142.32,373.79c-.99-1.88-1.05-3.68.48-5.33,1.33,1.92,1.37,3.72-.48,5.33Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M134.73,347.23c-1.3-.46-2.6-.92-3.9-1.39-1.98-.77-3.68-1.86-4.56-3.94.62-.5,1.23-.99,1.84-1.49,3.45,1.03,5.71,3.24,6.62,6.81Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M257.7,389.48c-1.18-.63-1.86.3-2.23,1.38.8.55,1.6,1.09,2.4,1.64,1.09-1.08,1.28-2.24-.16-3.02Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M137.59,380.92c-.54,1.05-1.33,1.72-2.47,1.03-1.26-.76-1.31-2.03-.99-3.35,1.16.77,2.31,1.54,3.46,2.32Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M133.88,375.1h0c-.1-.07-.19-.16-.28-.24-1.25-1.18-1.17-2.44-.01-3.8,1.16,1.26,1.25,2.61.3,4.03Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M249.05,384.57c-1.49-.19-2.85.06-3.96,1.18,1.86,1.47,3.15.97,3.96-1.18Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M106.11,366.06c-.35.79-.7,1.59-1.05,2.37-1.67-1.71-.57-2.17,1.05-2.37Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M320.82,219.49c-.42-1.06-.29-2.04.45-2.91,1.07,1.15.67,2.09-.45,2.91Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M309.55,303.33c-.52,1.52-1.27,2.43-2.84,1.09.94-.36,1.89-.72,2.84-1.09Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M264.07,426.25c.38-1.25.16-2.34-.81-3.23-1,1.4-.36,2.38.81,3.23Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M188.32,405.68c-.1.15-.3.3-.29.45.03.34.15.67.24,1.01.01-.48.04-.97.05-1.46Z"
            fill="#463332"
            strokeWidth={0}
          />
          <Path
            d="M93.43,379.59c.58-.72.65-2,.74-2.95.26-3.43.64-6.92,1.49-10.28.59-2.05,1.79-3.97,2.74-5.88.61-1.14,1.2-2.44,2.23-3.26,1.04-.85,2.25-.52,2.26.94.02,1.03-.45,2.15-.85,3.12-1.45,3.38-2.92,6.37-4.09,9.75-.65,2.26-1.47,4.37-1.34,6.71.11,1.37.09,3.14.89,4.3.9,1.41,3.59,5.49,4.63,4.09,1.31-1.75,1.9-8.07,2.24-10.16.55-4.05,2.59-7.85,4.81-11.27.81-1.23,2.49-1.77,2.36.28-.34,2.34-2.1,4.35-2.79,6.61-1.22,3.83-3.47,11.58-2.65,15.59.68,2.7,4.68,4.75,7.25,3.72,4.21-1.95,6.29-10.85,8.42-14.62,1.71-3.08,2.72-6.56,5.34-9.01,1.89-1.63,3.83-.42,4.1,1.98.54,3-.01,6.53,1.95,9.15,3.34,3.96,8.59-.19,9.94-3.88,1.57-4.92,1.17-10.24.55-15.39-.32-2.73-1.7-5.14-3.6-7.13-2.45-2.64-5.01-5.09-7.81-7.13-1.52-1.08-3.07-2.29-3.68-4.1-1-2.82-.09-5.78.31-8.74.23-2.97,1.2-5.76,3.16-8.08,1.71-2.28,3.34-4.7,5.54-6.6,3.54-2.83,7.65-5.01,11.96-6.45,1.44-.53,1.85-1.9,1.87-3.27.04-1.98.22-4.37-.64-5.52l-.06-.08c-1.88-2.54-12.75,2.94-14.94,4.45-11.24,7.65-17.68,17.42-17.58,31.1-.07,4.19-4.54,4.05-7.67,5.08-8.77,1.67-15.16,8.59-18.96,16.09-1.76,3.37-3.21,7.08-3.49,10.86-.29,3.34.6,6.62,2.76,9.27.58.77,1.91,1.71,2.61.75Z"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M368.2,236.1c-10.94-.66-12.28-15.91-18.06-20.05-2.98-2.13-9.49-5.2-11.75-7.84-1.7-1.98-1.85-7.42-.53-9.31,1.44-2.06,7.11-5.81,9.98-5.6,1.9.13,6.52.39,8.14,1.6,1.97,1.48,4.92,6.68,6.64,7.33,1.24.47,1.32-3.81,1.43-4.81.22-1.99,0-6,0-6l-.5-2.19s-2.56-8.92-2.69-10.45c-.2-2.3,1.4-11.37,2.97-13.18,1.2-1.39,6.71-3.02,8.88-3.12,2.04-.1,8.16,2.6,9.7,4.12,1.33,1.32,1.75,4.58,1.74,6.19,0,1.5-.38,6.26-.38,6.26,0,0,.75-9.8,2.56-11.88.7-.81,4.47-3.14,6.29-3.42,1.47-.22,5.88.77,6.02.78,1.31.14,6.46,2.68,7.24,3.76.68.94,1.48,5.46,1.77,6.5.82,2.95-3.82,9.38-3.82,9.38,0,0,5.67-7.26,7.35-8.12,1.79-.92,6.86-.29,8.73,0,2.37.37,4.26,3.17,5.51,4.89,1.57,2.15-1.33,13.07-1.95,15.4-.69,2.6-2.62,11.85-3.31,13.94-1.03,3.15-.97,2.78-.97,2.78l-1.5,7.44-2.2,8.76s-3.86,7.56-5.87,9.17c-1.68,1.34-8.48,2.68-8.48,2.68l-5.72.95"
            fill="#473333"
            strokeWidth={0}
          />
          <Path
            d="M299.65,296.08c-5.24-5.58,32.43-11.81,42.72-14.04,7.1-1.54,18.93-11.63,23.47-21.22,4.71-9.94,4.69-23.97,6.72-31.45,1.41-5.17,28.64.54,27.3,5.45-3,11.02-.2,19.26-9.3,41.66-2.42,5.97-7.56,12.58-11.44,15.91-6.62,5.7-19.51,13.13-34.45,14.67-3.61.37-23.39,5.72-43.04-.84"
            fill="#473333"
            strokeWidth={0}
          />
          <Path
            d="M306.23,299.33s-.12-4.22,1.7-4.76c9.33-2.77,25.44-3.2,34.82-6.71,4.52-1.7,16.26-6.69,20.14-10.38,4.37-4.17,11.44-15.94,12.88-20.91,2.15-7.44,6.01-29.14,6.01-29.14l12.61,4.56-1.65,13.92-1.68,9.54s-3.7,12.51-5.27,15.94c-1.61,3.52-3.34,6.94-6.57,10.75-3.81,4.51-5.21,5.75-11.61,9.49-5.95,3.47-5.28,4.35-26.85,10.23-7.99,2.18-24.75,1.75-24.75,1.75,0,0-11.58-.61-9.75-4.28Z"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M319.72,294.72c-.48,3.52,10.65,1.17,15.19.07,10.62-2.57,28.04-8.06,33.22-15.87,2.33-3.51,5.87-8.22,7.17-12.03.6-1.75,2.52-8.54,3.19-13.39.21-1.56,3.42-19.42,1.76-18.05-2.01,1.67-5.45,15.78-7.07,21.24-1.71,5.75-6.77,16.29-11.59,21.37-5.32,5.6-26.11,14.51-34.59,14.63"
            fill="#eea42b"
            strokeWidth={0}
          />
          <Path
            d="M369.45,231.14c-10.02-1.07-9.14-14.36-15.05-18.43-4.02-2.77-12.69-4.67-14.35-8.1-1.1-2.28,2.12-6.3,4.28-6.75,2.7-.56,9.97.48,12.28,2.05,2.06,1.41,5.06,5.83,5.37,7.92.18,1.24-.98,2.61.21,3.38,2.25,1.45,4.17-3.68,9.31-1.54,1.52.63,3.99.94,5.34,2.13.85.75,5.77,4.53,6.77,5.74.87,1.06,2.68,4.13,2.88,5.32.33,2.01-1.52,7.06-1.52,7.06,0,0-1.65,3.05-2.66,3.67-1.42.87-16.2-2.73-12.7-2.51"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M370.19,208.02c-4.69-1.85-.87-14.06-.72-18.84.08-2.71-2.79-11.14-2.95-13.91-.13-2.2.52-7.06,2.42-8.45,1.21-.89,4.84-1.58,6.39-1.01,1.6.59,4.22,3,4.77,4.41.91,2.32.78,7.72.67,10.11-.1,1.95-.03,9.44-.02,11.29,0,.87-.17,5.92-.4,7.59-.16,1.18-.77,2.65-.09,3.48,1.44,1.76,4.42,2.12,5.66.74,1.35-1.5,2.07-7.53,2.07-7.53l1.75-18.47s.29-5.64,1.19-6.77c.77-.98,3.72-1.86,5.1-1.85,1.42.02,4.38,1.8,4.97,2.93,2.03,3.86-.83,11.52-1.56,16-.57,3.51-1.43,14.15-1.43,14.15l-.18,5.94s3.02,1.03,4.16.53c3.9-1.67,5.55-13.55,5.55-13.55,0,0,1.2-9.2,2.36-11.61.67-1.38,3.08-2.73,4.74-2.89s5.83,1.33,6.4,2.7c1.62,3.93-2.8,15.27-4.22,20.55-.54,2.01-2.38,8.04-2.38,8.04l-2.28,4.58s-7.32-1.81-9.98-1.82c-1.97,0-6.81,1.54-8.44,1.98-2.21.61-6.57,5.96-6.57,5.96,0,0-5.51-9.19-8.27-9.6"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M382.4,231.92c-2.3-2.48,3.26-7.25,5.76-9.31,3.01-2.47,9.05-6.6,13.57-6.79,2.43-.1,10.45-1.16,12.27.83,1.14,1.25-.79,6.3-1.43,8.06-.53,1.44-3.12,5.79-4.06,6.83-1.64,1.83-8.34,4.98-8.34,4.98,0,0-11.02,1.89-12.14-.15"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M341.72,205.17c-.2-.35.09-5.46,2.14-6.16,2-.68,9.34.75,11.56,2.18,3.05,1.97,3.43,9.01,6.33,10.49,1.5.76,6.76-1.22,8.49-1.25,2.78-.04,6.72,2.31,8.36,3.73,1.8,1.57,4.26,5,5.14,6.98.39.87,2.22,5.48,2.22,5.48l.29.2s5.79-6.17,7.56-7.41c2.07-1.45,5.78-2.88,7.77-2.11,1.74.68,3.06,3.66,3.11,5.03.03.9-1.44,4.46-2.44,5.65-1.18,1.4-6.07,3.95-8.38,4.41s-6.93.56-9.15-.05c-4.54-1.24-13.03-5.48-16.5-8.24-3.04-2.42-12.97-14.13-14.19-15.24-3.56-3.24-12.55-3.46-11.91-4.37"
            fill="#eea42b"
            strokeWidth={0}
          />
          <Path
            d="M197.4,410.66c.03-2.67-.12-5.31.26-7.73.32-2.5,1.55-4.76,2.69-7,1.38-2.48,1.2-5.04-1.38-6.64-1.74-.94-3.65-1.98-5.55-1.33-1.13.92-2.68,2.38-4.06,4.46-1.63,2.45-2.79,4.9-3.1,7.96-.54,5.39-.12,10.87-.23,16.41.14,2.96.28,6,.74,8.99,4.08-.36,8.15-.83,12.2-1.38-1.75-4.38-1.6-9.1-1.56-13.73Z"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M235.47,389.87l.13.05c8.92,3.29,17.3-2.47,24.61-7.42,10.83-7.65,19.84-18.39,28.03-28.49,6.73-8.55,11.1-17.28,13.91-27.74.9-3.67,1.69-7.18,1.14-10.83-.55-3.64-2.93-6.77-4.15-10.59-2.82-8.25,2-13.85,8.3-18.63,7.27-5.71,6.3-10.21,7.24-18.15,1.25-6.49,3.36-12.8,4.66-20.22,1.65-8.58,2.32-17.15,2.75-25.82.6-10.1,4.16-21.52-.43-31.28-6.99-12.48-26.29-10.16-38.36-8.43-8.48,1.21-16.93,2.52-24.95,5.49-8.55,3.15-18.08,7.28-23.1,15.11-6.03,9.34-6.61,29.06-7.39,39.72-.38,8.28-.49,16.59-1.24,24.87-1.22,12.31-3.33,23.52-3.98,36.21-.6,8.46-.57,16.42-.98,24.77-.86,18.49-7.79,52.2,13.81,61.41Z"
            fill="#c77a20"
            strokeWidth={0}
          />
          <Path
            d="M259.92,408.46c-.94-4.22-1.51-8.02-2.34-12.14-.29-1.12-.5-1.85-1.53-1.71-1.44.45-4.37,1.92-5.58,3.4-.02,4.41.19,7.99.37,10.39.39,5.02.9,9.43,1.4,13.1,3.69.32,7.38.67,11.05.97-.06-.24-.13-.47-.19-.71-1.32-4.46-2.25-8.78-3.19-13.3Z"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M159.7,305.34c3.29,6.41,9.98,10.28,8.87,11.9-.5.73-1.94.11-4.84,1.12,0,0-2.38.83-4.03,2.23-3.91,3.32,3.03,16.11,4.84,21.2,2.45,6.89,5.71,16.06,13.71,25.29,7.56,8.73,15.39,12.89,31.04,21.2,12.71,6.75,19.07,10.13,21.36,8.18,4.37-3.7-13.06-5.11-15.35-33.46-.29-3.54-.43-23.2.03-32.74.72-14.96,1.92-20.02,3.63-41.66.66-8.41.99-12.61,1.21-17.48.87-19.69-.67-22.14,1.61-31.62,1.45-6.03,2.89-8.41,3.63-15.25.45-4.16.99-9.17-.4-14.88-1.08-4.43-2.17-4.55-10.48-18.23-8.18-13.46-8.83-16.14-8.87-18.97-.05-3.65.92-6.86-.81-7.81-1.94-1.07-5.67,1.6-8.06,3.35-3.18,2.32-8.95,6.54-12.5,14.51-1.24,2.8-4.89,11-2.02,19.71,1.76,5.35,5.03,8.01,3.63,10.04-1.7,2.45-7.02-.65-12.09,1.86-4.25,2.1-5.58,7.13-8.06,17.11-1.75,7.05-2.87,11.5-2.82,17.85.08,11.12,3.63,19.44,1.21,20.46-1.24.52-2.45-1.56-4.03-1.12-2.23.62-2.56,5.48-2.02,22.32.38,11.71.66,13.03,1.61,14.88Z"
            fill="#cb8e31"
            strokeWidth={0}
          />
          <Path
            d="M231.04,204.02c5.65-.87,8.76-16.64,8.2-28.24-.1-1.96-.97-16.17-10.69-28.62-3.23-4.14-9.94-11.3-13.19-9.54-1.59.87-1.4,3.37-2.85,12.21-1.24,7.54-1.75,7.96-2.14,11.07-1.91,15.33,7.59,28.99,11.05,33.96,4.09,5.88,6.69,9.61,9.62,9.16Z"
            strokeMiterlimit={10}
            strokeWidth={2.93}
            fill="#d18e2d"
            stroke="#d18e2d"
          />
          <Path
            d="M239.49,184.38c-4.3-.87-5.23-11.98-5.81-18.88-.44-5.2-.99-12.61,1.34-22.65.64-2.77,6.91-28.92,16.1-28.94,7.34-.02,12.73,16.65,13.86,20.13,1.89,5.82,4.25,13.12,1.34,20.97-1.6,4.31-3.2,4.51-12.97,15.52-9.68,10.91-11.33,14.35-13.86,13.84Z"
            strokeMiterlimit={10}
            fill="#d18e2d"
            stroke="#d18e2d"
            strokeWidth={2.2}
          />
          <Path
            d="M235.76,199.46c-2.32-2.9,2.78-11.35,6.69-17.82,4.09-6.77,9.56-15.81,19.25-21.5,8.48-4.97,11.48-2.27,29.45-5.42,22.44-3.93,32.71-10.76,35.32-6.73,2,3.08-3.77,7.47-8.55,24.94-.75,2.72-1.24,4.94-2.97,7.52-3.75,5.58-9.77,7.62-14.13,8.71-13.8,3.44-19.6-.52-31.9.44-19.64,1.54-30.14,13.64-33.17,9.85Z"
            strokeMiterlimit={10}
            fill="#d18e2d"
            stroke="#d18e2d"
            strokeWidth={2.2}
          />
          <Path
            d="M263.54,158.19c-2.37-2.43.35-9.03,3.84-17.48,3.22-7.81,5.93-14.16,12.28-18.7,2.25-1.61,12.71-7.74,16.48-5.73,2.75,1.47.04,7.66.87,13.01,1.15,7.38.59,16.62-4.3,21.58-1.77,1.8-2.8,1.45-11.52,3.66-13.12,3.33-15.93,5.44-17.66,3.66Z"
            strokeMiterlimit={10}
            fill="#d18e2d"
            stroke="#d18e2d"
            strokeWidth={2.2}
          />
          <Path
            d="M164.83,342.55c3.34,7.67,5,11.51,7.82,15.02,2.95,3.67,6.43,6.32,13.41,11.61,3.97,3.01,6.98,5.29,11.17,7.85,9.29,5.66,21.7,11.02,23.1,9.22.53-.68-1.38-3.07-5.21-7.85-5.03-6.27-5.92-6.28-7.08-8.88-1.12-2.49-1.12-5.76-1.12-12.29,0-6.4.56-7.58-.37-10.92-.5-1.8-1.39-4.84-4.1-7.51-1.16-1.14-1.56-1.15-6.33-4.1-3.83-2.36-3.53-2.34-7.45-4.78-5.75-3.58-5.33-2.97-8.57-5.12-1.52-1.01-2.73-1.88-8.94-6.14-2.51-1.73-3.89-2.64-5.96-2.73-.31-.01-3.42-.11-5.22,1.71-1.81,1.82-1.38,4.65,0,9.9,1.72,6.55,2.58,9.83,4.84,15.02Z"
            fill="#ffdf88"
            filter="url(#drop-shadow-1)"
            strokeWidth={0}
          />
          <Path
            d="M212.03,340.86c4.68-2.55,1.43-17.33.93-19.61-1.7-7.72-5.01-13.11-6.51-15.5-3.61-5.76-7.5-9.43-9.61-11.39-2.36-2.19-5.01-4.13-10.23-7.91-9.45-6.85-8.46-5.42-10.85-7.59-7.26-6.59-8.71-12.77-14.26-13.28-1.89-.17-2.67-.02-3.1.32-1.35,1.07-.81,3.36-.93,8.54-.06,2.57-.21,2.77-.31,5.06-.46,10.87-.79,18.52,2.17,24.99,2.26,4.93,6.78,8.14,15.81,14.55,6.29,4.46,7.1,4.03,15.81,9.49,14.61,9.15,18.1,13.96,21.08,12.34Z"
            fill="#ffdf88"
            strokeWidth={0}
          />
          <Path
            d="M206.17,297.33c-2.89-3.67-5.36-5.83-10.31-10.15-6.62-5.78-12.85-10.14-22.56-16.94h0c-8.54-5.61-11.84-6.8-13.88-10.92-.6-1.22-1.16-2.83-.3-12.19.97-10.55,1.51-15.95,4.52-22.35,2.34-4.96,4.64-9.68,9.35-10.67,3.58-.75,7.12.95,8.45-.51,1.14-1.25-.4-3.7-.9-4.57-4.72-8.11-2.32-19.95,0-25.4,3.71-8.71,13.56-15.95,17.8-14.48,1.28.45,1.78,1.85,2.71,4.32,1.31,3.47.55,5.09,1.51,8.64.23.85.69,2.3,2.41,5.33,7.04,12.42,17.01,19.37,15.39,28.06-.19,1.04-.29.7-.98,3.26-1.5,5.57-1.85,10.21-1.91,13.25-.4,2.99-.88,6.92-1.33,11.56-.15,1.5-.33,3.48-.54,6.13-.36,4.69-.48,7.69-.84,12.01-.31,3.77-.57,5.82-.73,7.51-1.97,20.01.21,34.65-2.39,35.07-1.07.17-1.77-2.28-5.46-6.96Z"
            fill="#ffdf88"
            strokeWidth={0}
          />
          <Path
            d="M228.34,207.28c6.29-.89,8.37-15.81,8.71-18.24.96-6.85-.07-12.44-1.29-19.09-1.25-6.83-1.88-10.24-3.87-13.96-4.81-8.98-15.34-17.44-20.97-15.39-2.27.83-3.27,3.98-5.16,10.26-2.4,7.96-3.74,12.39-3.23,18.24.62,7,3.5,11.53,9.03,20.23,6.65,10.46,11.86,18.65,16.78,17.95Z"
            fill="#ffdf88"
            filter="url(#drop-shadow-2)"
            strokeWidth={0}
          />
          <Path
            d="M235.19,186.49c-4.66-2.73-3.99-15.84-3.63-22.72.46-8.91,2.45-15.29,5.03-23.34,4.72-14.74,8.38-26.15,12.95-26.14,5.38,0,9.15,15.79,10.27,22.35.79,4.67,2.3,13.49-.44,23.58-4.44,16.33-18.3,29.72-24.17,26.27Z"
            fill="#ffdf88"
            filter="url(#drop-shadow-3)"
            strokeWidth={0}
          />
          <Path
            d="M236.43,308.34c-3.63-2.4-3.1-17.42-1.89-47.37,1.12-27.75,1.77-41.76,5.67-48.2,6.47-10.68,15.73-14.12,33.29-20.66,9.68-3.6,28.34-10.54,35.17-1.1.71.98,1.03,1.78,1.65,3.3,4.56,11.25,2.1,23.22.71,30.57-6.12,32.22-1.46,32.04-6.14,40.21-5.19,9.06-10.05,8.1-30.22,20.38-26.45,16.1-32.6,26.58-38.24,22.86Z"
            fill="#d39432"
            strokeWidth={0}
          />
          <Path
            d="M228.03,350.72c5.86,2.4,11.2-4.91,22.17-11.87,11.38-7.21,14.73-5.11,31.56-15.26,6.82-4.11,10.94-7.28,11.74-12.15.74-4.52-1.88-7.63,0-12.15,1.38-3.32,3.58-3.55,6.26-6.5,5.31-5.85,7.13-16.5,4.43-18.93-2.76-2.48-9.21,4.52-27.91,16.39-21.22,13.47-31.83,20.21-37.03,22.32-5.44,2.21-13.53,5.02-15.13,11.58-.79,3.23.74,4.34,0,11.02-.62,5.66-2.06,7.98-.78,11.02,1.3,3.08,4.3,4.36,4.69,4.52Z"
            fill="#d39432"
            strokeWidth={0}
          />
          <Path
            d="M232.34,385.1c6.96,3.99,18.99-4.37,29.14-11.43,14.56-10.13,22.56-20.07,25.13-23.39,6.31-8.15,15.35-19.84,12.03-24.17-3.06-3.98-15.07.26-31.28,5.98-20.67,7.3-28.78,13.81-33.15,17.93-9.28,8.75-10.05,14.58-10.16,16.89-.27,5.78,2.54,10.98,2.94,11.69,1.11,2,2.79,5.03,5.35,6.5Z"
            fill="#d39432"
            strokeWidth={0}
          />
          <Path
            d="M242.67,209.7c-3.97-2.75-4.2-13.09-1.86-20.44,3.12-9.83,10.79-14.24,20.99-20.12,10.65-6.13,19.47-8.29,27.64-10.22,3.36-.79,25.99-6.14,27.11-1.92.36,1.36-1.71,2.98-11.16,10.86-18.25,15.22-16.96,14.54-21.53,17.89-6.88,5.03-5.54,3.42-20.2,13.1-15.1,9.96-18.22,12.78-20.99,10.86Z"
            fill="#ffdf88"
            strokeWidth={0}
          />
          <Ellipse
            cx="202.29"
            cy="239.96"
            rx="16.29"
            ry="11.14"
            transform="translate(-47.91 429.44) rotate(-87.01)"
            filter="url(#drop-shadow-4)"
            fill="#312112"
            strokeWidth={0}
          />
          <Ellipse
            cx="199.73"
            cy="234.31"
            rx="4.81"
            ry="3.34"
            transform="translate(-53.15 409.92) rotate(-84.33)"
            fill="#feedd9"
            strokeWidth={0}
          />
          <Path
            d="M116.48,339.35c1.63-1.77,1.42-4.16,1.38-5.25-.23-7.24,5.74-14.06,7.84-16.45,2.53-2.89,6.09-5.02,13.29-9.19,6.43-3.73,8.09-3.85,8.86-3.26.93.71.86,2.65,0,3.85-1.14,1.61-3.34,1.48-6.01,2.08-4.01.89-6.61,2.86-9.49,5.04-4.44,3.35-6.68,7.09-7.91,9.19-1.58,2.69-6.88,11.72-3.48,15.42,1.76,1.92,4.16.53,6.65,2.67,2.98,2.57,3.57,8.03,1.27,11.86-3.2,5.3-10.65,5.33-12.66,5.34-7.41.03-16.38-4.24-16.46-9.19-.06-3.83,6.34-8.89,12.03-10.08,1.28-.27,3.3-.5,4.71-2.02Z"
            fill="#eea42b"
            strokeWidth={0}
          />
          <Path
            d="M265.4,174.17c-5.48-2.83-7-20.6-2.07-33.18,6.95-17.73,26.69-25.07,31.12-19.02,4.52,6.17-6.27,27.05-7.61,29.64-4,7.73-14.95,25.91-21.44,22.56Z"
            fill="#ffdf88"
            strokeWidth={0}
          />
          <Path
            d="M232.94,246.86c.56-13.9.51-19.01,3.2-25.22,3.02-7,7.34-10.96,12.16-14.52,3.56-2.63,15.34-10.8,34.63-12.9,9.58-1.05,22.65-3.79,24.06.91.27.9.3,2.7-7.05,12.02-5.27,6.68-9.01,11.42-15.72,17.46-11.98,10.78-23.3,13.99-22.86,16.03.35,1.63,8.07,2.33,15.11.24,3.37-1,5.63-2.36,8.04-1.05,2.5,1.36,3.42,4.67,4.02,6.84,1.86,6.71.34,12.87-.73,16.99-1.74,6.71-4.44,11.26-6,13.86-4.02,6.68-8.38,10.89-10.85,13.03-7.57,6.59-12.54,9.53-17.1,12.8-16.94,12.11-20.49,22.98-24,20.98-3.76-2.14.31-14.56,1.71-50.63.35-8.95,1.02-17.88,1.38-26.83Z"
            fill="#ffdf88"
            strokeWidth={0}
          />
          <Ellipse
            cx="247"
            cy="240.47"
            rx="16.76"
            ry="11.7"
            transform="translate(-7.41 473.09) rotate(-86.67)"
            fill="#312112"
            filter="url(#drop-shadow-5)"
            strokeWidth={0}
          />
          <Ellipse
            cx="245.26"
            cy="234.31"
            rx="4.81"
            ry="3.34"
            transform="translate(-24.11 440.44) rotate(-81.12)"
            fill="#feedd9"
            strokeWidth={0}
          />
          <Path
            d="M227.25,342.42c-1.08-.32-1.03-3.27-1.07-4.95-.07-5.87,1.73-12.43,5.26-16.98,2.94-3.93,6.33-5.75,10.06-7.63,2.89-1.57,6.47-3.95,9.37-6.1,2.11-1.54,3.95-3.19,5.99-4.86,8.13-6.71,21.73-11.54,29.49-12.53,1.96-.12,4.42-.58,4.85,1.02.18,2.21-2.67,8.03-4.13,10.77-2.44,4.3-4.64,7.74-7.8,10.73-5.28,4.7-11.61,9.08-17.06,13.28-8.13,6.04-17.84,13.85-24.75,15.56-1.46.45-3.33.94-5.09,1.3-2.01.31-3.43.87-5.06.41l-.05-.02Z"
            fill="#ffdf88"
            strokeWidth={0}
          />
          <Path
            d="M214.2,321.08c-11.95-4.51-22.49-19.14-21.67-32.46.22-5,2.28-9.66,6.18-11.45,2.48-1.15,5.3-1.19,7.98-1.33,4.23-.12,7.6-.52,11.63-.69,9.68-.18,20.34-.23,29.47,2.43,10.54,2.66,8.75,16.49,5.39,24.58-2.43,6.72-8.23,12.36-14.1,15.59-7.41,3.93-16.2,6.35-24.71,3.4l-.16-.06Z"
            fill="#312112"
            strokeWidth={0}
          />
          <Path
            d="M239.91,281.31c-1.1,1.19-3.99.75-6.92.84-5.48,0-13.72,0-19.16,0-2.22,0-3.8.04-4.7-.35-1.62-.67-1.42-2.18.47-2.65.67-.17,1.56-.19,2.37-.2,5.8,0,18.51,0,24.31,0,2.29-.13,4.8.72,3.67,2.32l-.04.04Z"
            fill="#fff8ed"
            strokeWidth={0}
          />
          <Path
            d="M200.48,302.57c1.27-3.14,7.49-3.75,13.48-4.34,14-1.37,32.6,1.26,33.57,7.09.47,2.82-3.33,5.42-6.71,7.74-1.46,1-11.57,7.69-23.63,4.66-9.73-2.45-18.53-10.68-16.72-15.15Z"
            fill="#e73e1b"
            strokeWidth={0}
          />
          <Path
            d="M223.43,372.73c-3.02-8.26,2.05-16.71,3.62-19.33,2.95-4.92,7.72-10.01,25.74-18.52,11.11-5.25,36.02-15.95,38.2-12.08.26.46,2.79,6.83-3.51,14.84-6.22,7.9-8.06,10.24-12,14.09-6.02,5.87-7.11,7.59-19.18,16.68-15.28,11.5-24.71,11.69-29.25,9.55-2.06-.97-2.87-3.2-3.62-5.23Z"
            filter="url(#drop-shadow-6)"
            strokeWidth={0}
          />
          <G opacity={0.89}>
            <G mask="url(#mask)">
              <Path
                d="M233.04,352.19c-.38-.53,6.21-8.5,17.06-15.1,9.55-5.8,20.27-9.85,20.57-9.34.3.5-9.85,9.34-18.38,14.66-8.58,5.36-18.82,10.39-19.25,9.77Z"
                fill="#fff"
                strokeWidth={0}
              />
            </G>
          </G>
          <G opacity={0.89}>
            <G mask="url(#mask-1)">
              <Path
                d="M253.55,175.9c-.34-.76-1.88-1.85,12.86-9.39,15.35-7.85,51.6-14.08,50.14-9.51-.22.7-23.21,7.5-35.6,11.86-12.48,4.38-26.99,7.92-27.39,7.05Z"
                fill="#fff"
                strokeWidth={0}
              />
            </G>
          </G>
          <G opacity={0.89}>
            <G mask="url(#mask-2)">
              <Path
                d="M249.3,205.79c-.23-.79,11.4-7.48,27.73-10.69,14.37-2.82,29.4-3.05,29.56-2.31.15.72-15.76,3.76-28.65,6.45-12.97,2.71-28.37,7.47-28.64,6.55Z"
                fill="#fff"
                strokeWidth={0}
              />
            </G>
          </G>
        </G>
        <Ellipse
          cx="230.52"
          cy="219.73"
          rx="220.6"
          ry="211.68"
          fill="none"
          strokeWidth={16}
          stroke="#60a8b1"
          strokeMiterlimit={10}
        />
        <Ellipse
          cx="371.75"
          cy="402.33"
          rx="53.33"
          ry="50.87"
          stroke="#60a8b1"
          fill="#fff"
          strokeWidth={8}
        />
        <Text
          transform="translate(354.75 424.66) scale(1.01 1)"
          fill="#1d1d1b"
          fontSize={60.31}
        >
          <TSpan x="0" y="0">
            +
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}
 */