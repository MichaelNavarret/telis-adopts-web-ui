import { FormEvent, forwardRef, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./SpecieFormAddDialog.module.scss";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import strings from "../../../../l10n";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import Dropzone from "../../../../components/Form/Dropzone";
import { FaCirclePlus } from "react-icons/fa6";
import { useTheme } from "../../../../context/ThemeProvider";
import uuid from "react-uuid";
import { errorToast, successToast } from "../../../../constants/toasts";
import { useMutation } from "react-query";
import { addSpecieFormToSpecie } from "../../../../api/species";
import { Button } from "../../../../components";

type SpecieFormAddDialogProps = {
  open: boolean;
  handleClose: () => void;
  specieId: string;
};

type SpecieForm = {
  id: string;
  code: string;
};

type FileAux = {
  id?: string;
  file?: File;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SpecieFormAddDialog = (props: SpecieFormAddDialogProps) => {
  const { open, handleClose, specieId } = props;
  const { colors } = useTheme();
  const [speciesForm, setSpeciesForm] = useState<SpecieForm[]>([
    { id: uuid(), code: "" },
  ]);
  const [files, setFiles] = useState<FileAux[]>([]);

  const { mutate: addSpecieFormMutation, isLoading: isAddSpecieFormLoading } =
    useMutation({
      mutationFn: async () => {
        for (const specieForm of speciesForm) {
          const file = files.find((file) => file.id === specieForm.id)?.file;
          if (file !== undefined) {
            await addSpecieFormToSpecie(
              specieId,
              {
                code: specieForm.code,
              },
              file
            );
          }
        }
      },
      onSuccess: () => {
        successToast(strings.EXTRAS_ADDED_SUCCESSFULLY);
        handleClose();
      },
    });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addSpecieFormMutation();
  };

  const addSpecieForm = () => {
    if (speciesForm.length !== files.length) {
      errorToast(
        "Please upload a file for the last specie form field added before adding a new one"
      );
      return;
    }
    const newSpeciesForm = [...speciesForm];
    newSpeciesForm.push({ id: uuid(), code: "" });
    setSpeciesForm(newSpeciesForm);
  };

  const handleCodeChange = (e: any, id: string) => {
    const newSpeciesForm = [...speciesForm];
    newSpeciesForm[
      newSpeciesForm.findIndex((specieForm) => specieForm.id === id)
    ].code = e.target.value;
    setSpeciesForm(newSpeciesForm);
  };

  const handleFileChange = (file: File, id: string) => {
    const newFiles = [...files];
    if (newFiles.find((file) => file.id === id) !== undefined) {
      newFiles[newFiles.findIndex((file) => file.id === id)].file = file;
    } else {
      newFiles.push({ id: id, file: file });
    }
    setFiles(newFiles);
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className={styles.formContainer}
    >
      {speciesForm.map((specieForm, index) => {
        return (
          <div className={styles.specieFormFieldsContainer} key={index}>
            <TextFieldComponent
              className={styles.textFieldForm}
              label={strings.CODE + " " + (index + 1)}
              type="text"
              id={"_" + index}
              value={specieForm.code}
              onChange={(e) => handleCodeChange(e, specieForm.id)}
              disabled={isAddSpecieFormLoading}
            />
            <Dropzone
              fieldId={specieForm.id}
              handleDrop={(files) => handleFileChange(files[0], specieForm.id)}
              disabled={isAddSpecieFormLoading}
            />
          </div>
        );
      })}
      <FaCirclePlus
        className={styles.addIcon}
        style={{ color: colors.CTX_MENUBAR_COLOR }}
        onClick={() => addSpecieForm()}
      />
      <Button
        className={styles.submitButton}
        content={strings.ADD}
        type="submit"
        width="150px"
        height="35px"
        disabled={isAddSpecieFormLoading}
        loading={isAddSpecieFormLoading}
        catsLoading={isAddSpecieFormLoading}
      />
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      content={dialogContent}
      TransitionComponent={Transition}
    />
  );
};

export default SpecieFormAddDialog;
