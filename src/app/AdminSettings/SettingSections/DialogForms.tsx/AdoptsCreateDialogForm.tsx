import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./DialogForms.module.scss";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { getSpeciesAutocomplete } from "../../../../api/species";
import { CREATION_TYPE } from "../../../../constants/SelectOptions";
import { Button } from "../../../../components";
import { AdoptCreateRequest, CreationType } from "../../../../types/adopt";
import { createAdopt } from "../../../../api/adopts";

type AdoptsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  handleChangeSnackBar: (message: string) => void;
};
//TODO: REMOVER LOS COMENTARIOS UNA VEZ TODO ESTE LISTO

const AdoptsCreateDialogForm = (props: AdoptsCreateDialogFormProps) => {
  const { open, handleClose, handleChangeSnackBar } = props;
  const queryClient = useQueryClient();
  //!-----Form States-----//
  const [adoptName, setAdoptName] = useState("");
  const [owner, setOwner] = useState("");
  const [specie, setSpecie] = useState("");
  const [creationType, setCreationType] = useState<CreationType>("PREMADE");

  //!----- Queries ----- //
  const { data: ownersResponse } = useQuery({
    queryKey: ["autocompleteOwners"],
    queryFn: () => {
      return getOwnersAutocomplete();
    },
  });

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  //!----- Mutations ----- //

  const { mutate: createAdoptMutation } = useMutation({
    mutationFn: (data: AdoptCreateRequest) => {
      return createAdopt(data);
    },
    onSuccess: () => {
      handleChangeSnackBar("Adopt created successfully");
      queryClient.invalidateQueries("adopts");
      handleClose();
    },
  });

  //!----- Functions ----- //

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptCreateRequest = {
      name: adoptName,
      ownerId: owner,
      specieId: specie,
      creationType: creationType,
    };
    createAdoptMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <TextComponent
        content="Create Adopt Form"
        animation={false}
        hover={false}
      />
      <TextField
        className={styles.textFieldForm}
        id="adoptName"
        label="Adopt Name"
        type="text"
        onChange={(e) => setAdoptName(e.target.value)}
      />

      <div style={{ width: "100%" }}>
        <InputLabel id="ownersLabel">Owner</InputLabel>
        <Select
          labelId="ownersLabel"
          style={{ width: "100%" }}
          label="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        >
          {ownersResponse?.map((owner, index) => {
            return (
              <MenuItem key={owner.id + "_" + index} value={owner.id}>
                {owner.name}
              </MenuItem>
            );
          })}
        </Select>

        <div style={{ width: "100%" }}>
          <InputLabel id="speciesLabel">Species</InputLabel>
          <Select
            labelId="speciesLabel"
            style={{ width: "100%" }}
            label="Species"
            value={specie}
            onChange={(e) => setSpecie(e.target.value)}
          >
            {speciesOptions?.map((specie, index) => {
              return (
                <MenuItem key={specie.id + "_" + index} value={specie.id}>
                  {specie.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>

        <div style={{ width: "100%" }}>
          <InputLabel id="creationTypeLabel">Creation Type</InputLabel>
          <Select
            labelId="creationTypeLabel"
            style={{ width: "100%" }}
            label="Creation Type"
            value={creationType}
            onChange={(e) => setCreationType(e.target.value as CreationType)}
          >
            {CREATION_TYPE?.map((type, index) => {
              return (
                <MenuItem key={type.label + "_" + index} value={type.value}>
                  {type.label}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>
      <Button type="submit" width="150px" height="35px">
        Create
      </Button>
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      content={dialogContent}
    />
  );
};

export default AdoptsCreateDialogForm;
