import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeProvider";
import styles from "../SpeciesComponent.module.scss";
import ImageExpositor from "./ImageExpositor";
import { useQuery } from "react-query";
import { getSpeciesAutocomplete } from "../../../api/species";

const LogoListComponent = () => {
  const { reloadTheme } = useTheme();
  const navigate = useNavigate();

  const { data: speciesList, isLoading } = useQuery({
    queryKey: ["species", "expositor"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const handleClick = (specie: string, specieId: string) => {
    localStorage.setItem("specie", specie);
    localStorage.setItem("specieId", specieId);
    reloadTheme();
    navigate("/home");
  };

  return (
    <div className={styles.speciesContainer}>
      {!isLoading &&
        speciesList?.map((specie) => {
          return (
            <ImageExpositor
              key={specie.id}
              src={specie.logoUrl}
              alt={`${specie.name}_logo`}
              onClick={() => handleClick(specie.name.toLowerCase(), specie.id)}
            />
          );
        })}
    </div>
  );
};

export default LogoListComponent;
