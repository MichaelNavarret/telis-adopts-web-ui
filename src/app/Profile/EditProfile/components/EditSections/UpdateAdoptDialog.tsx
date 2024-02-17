import { FormEvent, useEffect, useState } from "react";
import DialogComponent from "../../../../../components/surfaces/DialogComponent";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../../types/adopt";
import styles from "./UpdateAdoptDialog.module.scss";
import TextFieldComponent from "../../../../../components/Form/TextFieldComponent";
import strings from "../../../../../l10n";
import DEFAULT_ICON from "../../../../../assets/utils/not_icon.png";
import { getColorsBySpecie } from "../../../../../constants/colors";
import TextComponent from "../../../../../components/TextComponents/TextComponent";
import { isDefined } from "../../../../../tools/commons";
import { Button } from "../../../../../components";
import { SubTraitInfo } from "../../../../../types/subTraits";
import { useMutation, useQueryClient } from "react-query";
import { updateAdopt } from "../../../../../api/adopts";
import { successToast } from "../../../../../constants/toasts";

type UpdateAdoptDialogProps = {
  open: boolean;
  handleClose: () => void;
  adopt: AdoptInfo;
};

const UpdateAdoptDialog = (props: UpdateAdoptDialogProps) => {
  const { open, handleClose, adopt } = props;
  const speciesColors = getColorsBySpecie(adopt?.specieName || "");
  const [adoptName, setAdoptName] = useState("");
  const [traits, setTraits] = useState<SubTraitInfo[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setAdoptName(adopt?.name);
    adopt?.traits && setTraits(adopt?.traits);
  }, [adopt]);

  const { mutate: adoptUpdateMutation } = useMutation({
    mutationFn: (data: AdoptUpdateRequest) => {
      return updateAdopt(adopt.id, data);
    },
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries(["ownerCharacters"]);
      successToast("Adopt Updated successfully!");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptUpdateRequest = {
      name: adoptName,
      subTraits: traits.map((trait) => {
        return {
          id: trait.id,
          additionalInfo: trait.additionalInfo,
        };
      }),
    };
    adoptUpdateMutation(payload);
  };

  const orderTraitsByDisplayPriority = (traits: SubTraitInfo[]) => {
    return traits.sort(
      (a, b) => a.mainTraitDisplayPriority - b.mainTraitDisplayPriority
    );
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      className={styles.updateAdoptDialog_mainContainer}
      autoComplete="off"
    >
      <div className={styles.updateAdoptDialog_formHeader}>
        <div className={styles.updateAdoptDialog_formHeader_left}>
          <img
            src={adopt?.iconUrl ? adopt.iconUrl : DEFAULT_ICON}
            alt={adopt?.name}
            className={styles.updateAdoptDialog_formHeader_left_icon}
            style={{ border: "5px solid " + speciesColors.borderIcon }}
          />
        </div>
        <div className={styles.updateAdoptDialog_formHeader_right}>
          <div
            className={styles.updateAdoptDialog_formHeader_right_name_container}
            style={{ borderBottom: "1px dashed " + speciesColors.borderIcon }}
          >
            <TextComponent
              className={
                styles.updateAdoptDialog_formHeader_right_name_container_name
              }
              content={strings.NAME}
              hover={false}
              animation={false}
              colorText={speciesColors.button}
              fontSize="large"
            />
            <TextFieldComponent
              id="name"
              type="text"
              value={adoptName}
              onChange={(e) => setAdoptName(e.target.value)}
              required
            />
          </div>
          <div
            className={
              styles.updateAdoptDialog_formHeader_right_rarity_container
            }
          >
            <TextComponent
              className={
                styles.updateAdoptDialog_formHeader_right_name_container_name
              }
              content={adopt?.rarity || ""}
              hover={false}
              animation={false}
              backgroundColor={speciesColors.button}
              colorText={speciesColors.text}
            />
          </div>
        </div>
      </div>
      {isDefined(adopt?.traits) &&
        adopt?.traits.length > 0 &&
        traits.length > 0 && (
          <div
            className={styles.updateAdoptDialog_formContent}
            style={{ border: "2px dashed " + speciesColors.borderIcon }}
          >
            {orderTraitsByDisplayPriority(adopt?.traits).map((trait, index) => (
              <div
                key={index}
                className={styles.updateAdoptDialog_formContent_trait}
              >
                <TextComponent
                  content={trait.mainTrait}
                  hover={false}
                  animation={false}
                  colorText={speciesColors.button}
                  className={
                    styles.updateAdoptDialog_formContent_trait_mainTrait
                  }
                />
                <div
                  className={
                    styles.updateAdoptDialog_formContent_trait_additionalInfo
                  }
                >
                  <TextFieldComponent
                    id={trait.mainTrait}
                    type="text"
                    label={strings.ADDITIONAL_INFO}
                    value={traits[index].additionalInfo || ""}
                    onChange={(e) => {
                      const newTraits = [...traits];
                      newTraits[index].additionalInfo = e.target.value;
                      setTraits(newTraits);
                    }}
                  />
                </div>

                <div
                  className={
                    styles.updateAdoptDialog_formContent_trait_rarity_container
                  }
                >
                  <TextComponent
                    className={
                      styles.updateAdoptDialog_formContent_trait_rarity
                    }
                    content={trait.rarity}
                    hover={false}
                    animation={false}
                    colorText={speciesColors.text}
                    backgroundColor={speciesColors.button}
                    fontSize="small"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      <div className={styles.updateAdoptDialog_formButtonContainer}>
        <Button
          className={styles.updateAdoptDialog_formButton}
          content={strings.UPDATE}
          type="submit"
          colorButton={speciesColors.button}
          colorTextButton={speciesColors.text}
          withShadow={false}
          width="130px"
          height="40px"
        />
      </div>
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      dialogTitle="Update Adopt Info"
      content={dialogContent}
      maxWidth="xl"
      border={"5px solid " + speciesColors.borderIcon}
      colorTitle={speciesColors.button}
      backgroundColor={speciesColors.formContainer}
      borderRadius="40px"
    />
  );
};

export default UpdateAdoptDialog;
