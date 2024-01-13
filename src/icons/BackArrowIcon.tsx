type BackArrowIconProps = {
  iconColor?: string;
  style?: React.CSSProperties;
  className?: string;
  handleClick?: () => void;
};

const BackArrowIcon = (props: BackArrowIconProps) => {
  const { iconColor = "#FFFFFF", style, className, handleClick } = props;
  return (
    <div style={style} className={className} onClick={handleClick}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 500 420"
        enable-background="new 0 0 500 420"
      >
        <path
          stroke="none"
          fill={iconColor}
          d="
            M380.000000,172.999573 
            C396.666138,172.999573 412.832397,172.966080 428.998413,173.006943 
            C458.017426,173.080307 480.966492,195.787003 480.999298,224.408829 
            C481.032135,253.060730 458.162964,275.940704 429.155853,275.975311 
            C363.324707,276.053864 297.493439,276.000244 231.662216,276.000397 
            C229.887604,276.000427 228.113007,276.000427 225.026001,276.000427 
            C234.791580,284.227539 243.703842,291.555481 252.418137,299.111755 
            C276.492981,319.987335 277.289368,355.764099 254.247787,377.212677 
            C234.779465,395.334961 205.871735,395.659576 184.613525,377.835632 
            C158.570343,355.999573 132.623016,334.049225 106.632988,312.149780 
            C92.873680,300.556030 78.537529,289.566650 65.550827,277.164124 
            C56.751942,268.761017 48.618786,259.113037 42.364407,248.712891 
            C31.016026,229.842117 35.714306,206.629272 49.438816,189.292801 
            C66.042061,168.320023 87.720749,153.350830 107.495804,136.146835 
            C133.761246,113.296288 160.438766,90.901970 187.382446,68.853249 
            C215.909714,45.508644 257.995148,58.130421 269.437714,92.990982 
            C276.100647,113.290054 269.765320,134.965256 252.892136,149.338409 
            C243.904739,156.994171 234.838974,164.557953 224.815521,172.999573 
            C277.107300,172.999573 328.303650,172.999573 380.000000,172.999573 
            z"
        />
      </svg>
    </div>
  );
};

export default BackArrowIcon;
