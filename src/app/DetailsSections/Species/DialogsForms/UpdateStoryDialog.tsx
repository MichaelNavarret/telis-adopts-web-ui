import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateSpecie } from "../../../../api/species";
import { successToast } from "../../../../constants/toasts";
import strings from "../../../../l10n";
import { queryKeys } from "../../../../constants/queryKeys";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { Button } from "../../../../components";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./Dialogs.module.scss";

type UpdateStoryDialogProps = {
  open: boolean;
  currentStory: string;
  handleClose: () => void;
  specieId: string;
};

const UpdateStoryDialog = (props: UpdateStoryDialogProps) => {
  const { open, handleClose, specieId, currentStory } = props;
  const [story, setStory] = useState(currentStory);
  const queryClient = useQueryClient();

  const { mutate: updateStoryMutation, isLoading: isUpdateNameLoading } =
    useMutation({
      mutationFn: () => {
        return updateSpecie(specieId, { story: story });
      },
      onSuccess: (data) => {
        successToast(strings.SPECIE_STORY_UPDATED_SUCCESSFULLY);
        queryClient.invalidateQueries([queryKeys.specie, specieId]);
        setStory(data.history);
        handleClose();
      },
    });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateStoryMutation();
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.updateStoryDialogFormContainer}>
      <div className={styles.updateStoryContainer}>
        <TextFieldComponent
          label={strings.STORY}
          type="text"
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          required
          disabled={isUpdateNameLoading}
          fullWidth
          multiline
        />
      </div>
      <Button
        type="submit"
        content={strings.UPDATE}
        disabled={isUpdateNameLoading}
        loading={isUpdateNameLoading}
        catsLoading={isUpdateNameLoading}
      />
    </form>
  );

  return (
    <DialogComponent
      dialogTitle={strings.UPDATE_STORY}
      open={open}
      maxWidth="xl"
      content={dialogContent}
      handleClose={handleClose}
    />
  );
};

export default UpdateStoryDialog;
