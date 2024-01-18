import { useState } from "react";
import TextComponent from "../../../../../components/TextComponents/TextComponent";
import { SpecieFormInfo } from "../../../../../types/species";
import styles from "./SpecieFormExpositor.module.scss";
import SpecieFormItem from "./SpecieFormItem";

type SpecieFormExpositorProps = {
  specieFormList: SpecieFormInfo[];
  borderColor: string;
  handleClick: (value: string) => void;
};

const SpecieFormExpositor = (props: SpecieFormExpositorProps) => {
  const { specieFormList, borderColor, handleClick } = props;
  const [selected, setSelected] = useState<string>("");

  const handleSelected = (value: string) => {
    console.log("handleSelected", value);
    setSelected(value);
  };

  return (
    <>
      <TextComponent
        content={"Forms Specie"}
        animation={false}
        hover={false}
        className={styles.formSpecieTitle}
      />
      <div className={styles.formSpeciesContainer}>
        {specieFormList.map((specieForm) => (
          <SpecieFormItem
            key={specieForm.id}
            specieForm={specieForm}
            borderColor={borderColor}
            handleSelected={handleSelected}
            handleClick={handleClick}
            isSelected={selected == specieForm.id}
          />
        ))}
      </div>
    </>
  );
};

export default SpecieFormExpositor;
