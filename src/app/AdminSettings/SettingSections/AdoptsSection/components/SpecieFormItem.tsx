import { SpecieFormInfo } from "../../../../../types/species";
import styles from "./SpecieFormExpositor.module.scss";

type SpecieFormItemProps = {
  specieForm: SpecieFormInfo;
  borderColor: string;
  isSelected: boolean;
  handleSelected: (value: string, index?: number) => void;
  handleClick: (value: string, index?: number) => void;
  index?: number;
  disabled?: boolean;
};

const SpecieFormItem = (props: SpecieFormItemProps) => {
  const {
    specieForm,
    borderColor,
    handleSelected,
    handleClick,
    index,
    isSelected,
  } = props;

  const handleOptionClick = (value: string) => {
    console.log("handleOptionClick", value);
    handleClick(value, index);
    handleSelected(value, index);
  };

  const filterGray = `${borderColor}(100%)`;

  return (
    <div
      key={specieForm.id}
      className={styles.formSpecieContainer}
      style={{
        border: "1px solid " + borderColor,
        filter: isSelected ? filterGray : "",
        backgroundColor: isSelected ? borderColor : "",
      }}
      onClick={() => handleOptionClick(specieForm.id)}
    >
      <img src={specieForm.imageUrl} width={137.75} height={170.25} />
    </div>
  );
};

export default SpecieFormItem;
