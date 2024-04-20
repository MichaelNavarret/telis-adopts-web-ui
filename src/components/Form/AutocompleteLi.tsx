import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { Typography } from "@mui/material";

type AutocompleteLiProps = {
  option: string;
};

const AutocompleteLi = (props: AutocompleteLiProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const { colors } = useTheme();
  const { option } = props;

  return (
    <li
      {...props}
      style={{
        backgroundColor: hover ? colors.selected_color : undefined,
      }}
      key={option}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography style={{ width: "100%" }} noWrap>
        {option}
      </Typography>
    </li>
  );
};

export default AutocompleteLi;
