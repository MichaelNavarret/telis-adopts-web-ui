import { isDefined } from "../../tools/commons";
import styles from "./SectionComponent.module.scss";

type SectionFieldProps = {
  // ! Label (title) of the sectionField
  label: string;
  // ! Value (content) of the sectionField
  value?: string | number | null;
  // ! The param that defined if the value will be a normal text (false) or a link <a> (true).
  link?: boolean;
};

const SectionField = (props: SectionFieldProps) => {
  const { label, value, link } = props;

  const getSafeValue = (value?: string | number | null) => {
    // * If the value is not Defined (null / undefined), the function will be return "-"
    if (!isDefined(value)) return "-";
    // * If the Link param is true, the function will be return an <a> component with a href = {value}
    if (link)
      return (
        <a className={styles.valueLink} href={value as string} target="_blank">
          {value}
        </a>
      );
    // * If the value is Defined and not a link, only is return it.
    return value;
  };

  return (
    <div className={styles.sectionField}>
      <div className={styles.label} style={{ color: "grey" }}>
        {label}
      </div>
      <div className={styles.value}>{getSafeValue(value)}</div>
    </div>
  );
};

export default SectionField;
