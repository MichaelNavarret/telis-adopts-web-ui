import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type DesignersSectionProps = {
  designer: string;
};

const DesignersSection = (props: DesignersSectionProps) => {
  const { colors } = useTheme();
  const { designer } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        justifyContent: "center",
      }}
    >
      <StarRoundedIcon
        style={{
          color: colors.CTX_BUTTON_COLOR,
          fontSize: "25px",
          marginRight: "5px",
        }}
      />
      <TextComponent
        content={designer}
        hover={false}
        animation={false}
        colorText={colors.CTX_BUTTON_SHADOW_COLOR_2}
        letterSpacing="0.2rem"
        fontSize="small"
      />
    </div>
  );
};

export default DesignersSection;
