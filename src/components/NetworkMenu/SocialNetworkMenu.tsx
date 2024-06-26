import styles from "./SocialNetworkMenu.module.scss";
import NetworkBubble from "./NetworkBubble";
import { useTheme } from "../../context/ThemeProvider";
export type SocialNetworkMenuProps = {
  colorIcon?: string;
  colorBubble?: string;
  shadowBubbleColor?: string;
};

export const SocialNetworksMenu = (props: SocialNetworkMenuProps) => {
  const { colors } = useTheme();
  const {
    colorIcon = colors.text_02_color,
    colorBubble = colors.primary_color,
    shadowBubbleColor = colors.shadow_color,
  } = props;
  const width = "30";
  const height = "23";

  return (
    <div className={styles.socialNetworkContainer}>
      <NetworkBubble
        colorIcon={colorIcon}
        colorBubble={colorBubble}
        shadowColor={shadowBubbleColor}
        link="https://www.deviantart.com/teliwis"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={height}
          width={width}
          viewBox="0 -25 320 512"
          fill={colorIcon}
        >
          <path d="M320 93.2l-98.2 179.1 7.4 9.5H320v127.7H159.1l-13.5 9.2-43.7 84c-.3 0-8.6 8.6-9.2 9.2H0v-93.2l93.2-179.4-7.4-9.2H0V102.5h156l13.5-9.2 43.7-84c.3 0 8.6-8.6 9.2-9.2H320v93.1z" />
        </svg>
      </NetworkBubble>

      <NetworkBubble
        colorIcon={colorIcon}
        colorBubble={colorBubble}
        shadowColor={shadowBubbleColor}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          height={height}
          width={width}
          viewBox="0 0 250.000000 241.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,241.000000) scale(0.100000,-0.100000)"
            fill={colorIcon}
            stroke="none"
          >
            <path
              d="M627 1785 c-339 -342 -617 -625 -617 -629 0 -3 88 -6 195 -6 l195 0
                0 -575 0 -575 845 0 845 0 0 575 0 575 200 0 c110 0 200 3 200 8 0 4 -108 115
                -240 247 l-240 240 0 292 0 293 -195 0 -195 0 0 -90 c0 -49 -3 -90 -7 -90 -4
                0 -89 81 -188 179 l-180 179 -618 -623z m831 -1005 l2 -165 163 2 162 2 3 160
                2 161 55 0 55 0 0 -390 0 -390 -60 0 -60 0 0 180 0 180 -160 0 -160 0 0 -185
                0 -185 -60 0 -60 0 0 345 0 345 -110 0 -110 0 0 -345 0 -345 -75 0 -75 0 0
                343 0 342 -102 0 -103 0 -3 44 c-6 77 -31 72 350 69 l343 -3 3 -165z"
            />
          </g>
        </svg>
      </NetworkBubble>

      {/*Discord*/}
      <NetworkBubble
        colorIcon={colorIcon}
        colorBubble={colorBubble}
        shadowColor={shadowBubbleColor}
      >
        <svg
          height={height}
          width={width}
          viewBox="0 -60 640 512"
          xmlns="http://www.w3.org/2000/svg"
          fill={colorIcon}
        >
          <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
        </svg>
      </NetworkBubble>

      {/*Twiiter*/}
      <NetworkBubble
        colorIcon={colorIcon}
        colorBubble={colorBubble}
        shadowColor={shadowBubbleColor}
      >
        <svg
          height={height}
          width={width}
          viewBox="0 -40 512 512"
          xmlns="http://www.w3.org/2000/svg"
          fill={colorIcon}
        >
          <path d="M4,440.5c55.6,5,105.7-9,151.3-43.2c-47.7-4.2-79.6-28-97.4-72.6c15.6,1.9,30.2,2.4,45.7-1.8   c-51.4-16-78.8-49.6-82.5-103.8c15.4,7.2,29.9,12.4,47,12.6c-30.5-22.9-46.1-52.6-45.5-90c0.3-17.2,4.9-33.4,14-48.7   C93.1,159.1,164,195.7,251.3,201.8c-0.5-3.8-0.8-6.8-1.2-9.9c-7.2-55.4,28.8-105.8,83.8-116.3c34.5-6.6,65,2.5,90.8,26.3   c4,3.6,7.4,4.4,12.4,3.1c20.1-5.1,39.2-12.5,57.7-22.5c-7.1,23.4-21.7,41-41.5,55.8c4.5-0.8,9.1-1.4,13.6-2.3   c4.7-1,9.4-2.1,14.1-3.4c4.5-1.2,8.9-2.6,13.3-4.1c4.5-1.5,9-3.2,14.3-4.1c-2.6,3.6-5.1,7.4-7.9,10.9c-11.6,14.7-25,27.6-39.7,39.1   c-1.5,1.2-2.8,3.8-2.7,5.6c0.8,35.5-4.2,70.1-15.7,103.7c-22.6,66.2-62,119.8-121.1,158.1c-29.2,18.9-61.1,31.3-95.2,38.5   c-33.8,7.1-67.8,8.4-101.9,4.4c-34.2-4-66.7-14.1-97.3-29.9c-8.1-4.1-15.9-8.7-23.8-13.1C3.6,441.3,3.8,440.9,4,440.5z" />
        </svg>
      </NetworkBubble>

      {/*Kofi*/}
      <NetworkBubble
        colorIcon={colorIcon}
        colorBubble={colorBubble}
        shadowColor={shadowBubbleColor}
      >
        <svg
          height={height}
          width={width}
          viewBox="-1 -3 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={colorIcon}
        >
          <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
        </svg>
      </NetworkBubble>

      {/*Instagram*/}
      <NetworkBubble
        colorIcon={colorIcon}
        colorBubble={colorBubble}
        shadowColor={shadowBubbleColor}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 64 64"
          height={height}
          width={width}
          fill={colorIcon}
        >
          <path d="M 21.580078 7 C 13.541078 7 7 13.544938 7 21.585938 L 7 42.417969 C 7 50.457969 13.544938 57 21.585938 57 L 42.417969 57 C 50.457969 57 57 50.455062 57 42.414062 L 57 21.580078 C 57 13.541078 50.455062 7 42.414062 7 L 21.580078 7 z M 47 15 C 48.104 15 49 15.896 49 17 C 49 18.104 48.104 19 47 19 C 45.896 19 45 18.104 45 17 C 45 15.896 45.896 15 47 15 z M 32 19 C 39.17 19 45 24.83 45 32 C 45 39.17 39.169 45 32 45 C 24.83 45 19 39.169 19 32 C 19 24.831 24.83 19 32 19 z M 32 23 C 27.029 23 23 27.029 23 32 C 23 36.971 27.029 41 32 41 C 36.971 41 41 36.971 41 32 C 41 27.029 36.971 23 32 23 z" />
        </svg>
      </NetworkBubble>
    </div>
  );
};

export default SocialNetworksMenu;
