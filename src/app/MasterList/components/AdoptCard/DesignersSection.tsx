import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Colors } from "../../../../types/commons";

type DesignersSectionProps = {
  designer: string;
  onProfile?: boolean;
  colorSpecie?: Colors;
};

const DesignersSection = (props: DesignersSectionProps) => {
  const { colors } = useTheme();
  const { designer, onProfile, colorSpecie } = props;
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
          color: onProfile ? colorSpecie?.primary_color : colors.primary_color,
          fontSize: "25px",
          marginRight: "5px",
        }}
      />
      <TextComponent
        content={designer}
        hover={false}
        animation={false}
        colorText={onProfile ? colorSpecie?.shadow_color : colors.shadow_color}
        letterSpacing="0.2rem"
        fontSize="small"
      />
    </div>
  );
};

export default DesignersSection;
