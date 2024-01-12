import { FormEvent, useCallback, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./SpeciesCreateDialogForm.module.scss";
import { Button } from "../../../../components";
import { useMutation, useQueryClient } from "react-query";
import { createSpecie } from "../../../../api/species";
import strings from "../../../../l10n";
import { successToast } from "../../../../constants/toasts";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { useDropzone } from "react-dropzone";
import { useTheme } from "../../../../context/ThemeProvider";
import { isDefined } from "../../../../tools/commons";
import TextComponent from "../../../../components/TextComponents/TextComponent";

type SpecieCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const SpeciesCreateDialogForm = (props: SpecieCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const { colors } = useTheme();
  const [specieName, setSpecieName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: crateSpecieMutation, isLoading } = useMutation({
    mutationFn: () => {
      return createSpecie(acceptedFiles[0] as File, {
        specieName: specieName,
      });
    },
    onSuccess: () => {
      successToast(strings.SPECIE_CREATED_SUCCESSFULLY);
      queryClient.invalidateQueries("species");
      queryClient.invalidateQueries("autocompleteSpecies");
      clearStates();
      handleClose();
    },
  });

  const clearStates = () => {
    setSpecieName("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    crateSpecieMutation();
  };

  const onDrop = useCallback(() => {}, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <TextFieldComponent
        className={styles.textFieldForm}
        id="speciesName"
        label={strings.NAME}
        type="text"
        onChange={(e) => setSpecieName(e.target.value)}
        required
        disabled={isLoading}
      />
      <TextComponent
        content={strings.TRAITS_INFORMATION}
        animation={false}
        hover={false}
      />
      <div
        {...getRootProps()}
        style={{
          width: "500px",
          backgroundColor: colors.CTX_TABLE_ROW_HOVER_COLOR,
          padding: "10px",
          borderRadius: "15px",
          border: "5px dashed" + colors.CTX_MENUBAR_COLOR,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {!isDefined(acceptedFiles[0]) ? (
          <p>Drag 'n' drop some files here, or click to select files</p>
        ) : (
          <div>{acceptedFiles[0].name}</div>
        )}
      </div>

      <Button
        content={strings.CREATE}
        type="submit"
        width="150px"
        height="35px"
        disabled={isLoading}
        loading={isLoading}
        catsLoading={isLoading}
      />
    </form>
  );

  return (
    <DialogComponent
      dialogTitle={`${strings.CREATE} ${strings.SPECIE}`}
      open={open}
      handleClose={handleClose}
      content={dialogContent}
    />
  );
};

export default SpeciesCreateDialogForm;
