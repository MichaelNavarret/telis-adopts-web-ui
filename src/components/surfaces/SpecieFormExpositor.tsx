import TextComponent from "../TextComponents/TextComponent";
import styles from "./SpecieFormExpositor.module.scss";
import SpecieFormItem from "./SpecieFormItem";
import { getSpecie } from "../../api/species";
import { useQuery } from "react-query";
import { isDefined } from "../../tools/commons";
import strings from "../../l10n";

type SpecieFormExpositorProps = {
  specieId: string;
  borderColor: string;
  selected: string;
  setSelected: (value: string) => void;
};

const SpecieFormExpositor = (props: SpecieFormExpositorProps) => {
  const { specieId, selected, setSelected, borderColor } = props;

  const { data: specieInfo } = useQuery({
    queryKey: ["getSpecie", specieId],
    queryFn: () => {
      return getSpecie(specieId);
    },
    enabled: isDefined(specieId),
    refetchOnWindowFocus: false,
  });

  const handleSelected = (value: string) => {
    setSelected(value);
  };

  const handleClick = (value: string) => {
    if (selected == value) {
      setSelected("");
    } else {
      setSelected(value);
    }
  };

  const getSpecieFormList = () => {
    if (isDefined(specieId) && isDefined(specieInfo?.specieFormInfoList)) {
      return specieInfo?.specieFormInfoList.map((specieForm) => (
        <SpecieFormItem
          key={specieForm.id}
          specieForm={specieForm}
          borderColor={borderColor}
          handleSelected={handleSelected}
          handleClick={handleClick}
          isSelected={selected == specieForm.id}
        />
      ));
    }
    return <div>{strings.SPECIE_NOT_HAVE_FORMS}</div>;
  };

  return (
    <>
      <TextComponent
        content={strings.FORM_SPECIE}
        animation={false}
        hover={false}
        className={styles.formSpecieTitle}
      />
      <div className={styles.formSpeciesContainer}>{getSpecieFormList()}</div>
    </>
  );
};

export default SpecieFormExpositor;
