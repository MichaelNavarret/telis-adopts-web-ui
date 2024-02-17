import { isDefined } from "../../tools/commons";
import styles from "./SectionComponent.module.scss";

type SectionFieldProps = {
  label: string;
  value?: string | number | null;
};

const SectionField = (props: SectionFieldProps) => {
  const { label, value } = props;

  const getSafeValue = (value?: string | number | null) => {
    if (!isDefined(value)) return "-";
    return value;
  };

  return (
    <div className={styles.sectionField}>
      <div className={styles.label} style={{ color: "grey" }}>
        {label}
      </div>
      <div className={styles.value} style={{ color: "black" }}>
        {getSafeValue(value)}
      </div>
    </div>
  );
};

export default SectionField;
