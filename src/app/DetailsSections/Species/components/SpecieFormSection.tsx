import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import { SpecieFormInfo } from "../../../../types/species";
import styles from "./components.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import { MdRemoveCircle } from "react-icons/md";

type SpecieFormSectionProps = {
  specieFormList: SpecieFormInfo[];
};

const SpecieFormSection = (props: SpecieFormSectionProps) => {
  const { specieFormList } = props;
  const { colors } = useTheme();
  return (
    <div
      className={styles.specieFormSectionContainer}
      style={{ border: "1px solid" + colors.primary_color }}
    >
      <TextComponent
        content={"Forms"}
        animation={false}
        hover={false}
        fontSize="large"
      />
      <IoMdAddCircle
        className={styles.addIcon}
        style={{ color: colors.primary_color }}
      />
      <div className={styles.specieFormsContainer}>
        {specieFormList.map((specieForm) => {
          return (
            <div
              key={specieForm.id + "_container"}
              className={styles.specieFormItemContainer}
              style={{ border: "1px solid" + colors.primary_color }}
            >
              <img
                src={specieForm.imageUrl}
                alt="Form"
                width={137.75}
                height={170.25}
              />
              <MdRemoveCircle
                className={styles.removeIcon}
                style={{ color: colors.primary_color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecieFormSection;
