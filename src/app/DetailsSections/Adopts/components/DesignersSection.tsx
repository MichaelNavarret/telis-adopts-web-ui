import { useState } from "react";
import SectionField from "../../../../components/SectionComponent/SectionField";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import strings from "../../../../l10n";
import { OwnerInfo } from "../../../../types/owner";
import styles from "./components.module.scss";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaDeleteLeft } from "react-icons/fa6";
import AddDesignerBlade from "../EditBlades/AddDesignerBlade";
import { useMutation, useQueryClient } from "react-query";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";
import { AdoptUpdateRequest } from "../../../../types/adopt";

type DesignersSectionProps = {
  adoptId: string;
  designers: OwnerInfo[];
  disabled?: boolean;
};

const DesignersSection = (props: DesignersSectionProps) => {
  const { adoptId, designers, disabled } = props;
  const { colors } = useTheme();
  const border = "1px solid " + colors.CTX_MENUBAR_COLOR;
  const textColor = colors.CTX_FORM_TITLE_COLOR;
  const disableColor = "#E5E5E5";
  const borderBottom = "1px solid " + colors.CTX_MENUBAR_COLOR;
  const [openAddDesignerBlade, setOpenAddDesignerBlade] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateInformation } = useMutation({
    mutationFn: (data: AdoptUpdateRequest) => {
      return updateAdopt(adoptId || "", data);
    },
    onSuccess: () => {
      successToast(strings.ADOPT_UPDATE_SUCCESSFULLY);
      queryClient.invalidateQueries(["adoptDetails", adoptId]);
    },
  });

  const removeDesigner = (designerId: string) => {
    const newDesigners = designers.filter(
      (designer) => designer.id !== designerId
    );
    const payload: AdoptUpdateRequest = {
      designerIds: newDesigners.map((designer) => designer.id),
    };
    updateInformation(payload);
  };

  return (
    <>
      <div className={styles.designersSectionContainer} style={{ border }}>
        <div className={styles.headerContainer} style={{ borderBottom }}>
          <TextComponent
            content={strings.DESIGNERS}
            animation={false}
            hover={false}
            fontSize="medium"
            colorText={disabled ? disableColor : textColor}
          />
          <BsPersonFillAdd
            style={{ color: disabled ? disableColor : textColor }}
            className={styles.addDesignerIcon}
            onClick={() => setOpenAddDesignerBlade(true)}
          />
        </div>
        <div className={styles.contentContainer}>
          {designers.map((designer, index) => {
            return (
              <div
                className={styles.designerSingletonContainer}
                key={designer.id}
              >
                <SectionField
                  key={designer?.id}
                  label={strings.DESIGNER + " " + (index + 1)}
                  value={designer?.nickName}
                />
                <FaDeleteLeft
                  style={{ color: "red" }}
                  className={styles.deleteDesignerIcon}
                  onClick={() => removeDesigner(designer.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <AddDesignerBlade
        open={openAddDesignerBlade}
        handleClose={() => setOpenAddDesignerBlade(false)}
        adoptId={adoptId}
        designersIds={designers.map((designer) => designer.id)}
      />
    </>
  );
};

export default DesignersSection;
