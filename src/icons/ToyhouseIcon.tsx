type ToyhouseIconProps = {
  iconColor?: string;
  style?: React.CSSProperties;
  className?: string;
  handleClick?: () => void;
};

const ToyhouseIcon = (props: ToyhouseIconProps) => {
  const { iconColor = "#FFFFFF", style, className, handleClick } = props;
  return (
    <div style={style} className={className} onClick={handleClick}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="-10 0 275 420"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,241.000000) scale(0.100000,-0.100000)"
          fill={iconColor}
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
    </div>
  );
};

export default ToyhouseIcon;
