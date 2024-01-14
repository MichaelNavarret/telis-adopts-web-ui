import { useTheme } from "../../../context/ThemeProvider";
import { isDefined } from "../../../tools/commons";
import { AdoptInfo } from "../../../types/adopt";
import styles from "./MasterListExpositorAdopts.module.scss";

type MasterListExpositorAdoptsProps = {
  adopts: AdoptInfo[];
};

const MasterListExpositorAdopts = (props: MasterListExpositorAdoptsProps) => {
  const { adopts } = props;
  const { colors } = useTheme();
  const borderIconColor = colors.CTX_BUTTON_COLOR;

  return (
    <div className={styles.adoptsExpositorContainer}>
      {adopts.map((adopt, index) => (
        <img
          key={index}
          className={styles.adoptIcon}
          src={adopt.iconUrl}
          alt={"logo"}
          width={190}
          style={{
            filter: `drop-shadow(5px 5px 0 ${borderIconColor}) drop-shadow(-5px 5px 0 ${borderIconColor})
                drop-shadow(5px -5px 0 ${borderIconColor}) drop-shadow(-5px -5px 0 ${borderIconColor})`,
          }}
        />
      ))}
    </div>
  );
};

export default MasterListExpositorAdopts;
