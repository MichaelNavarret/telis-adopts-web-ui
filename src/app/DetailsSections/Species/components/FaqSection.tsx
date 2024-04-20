import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteFaq, getFaqsBySpecie } from "../../../../api/faqs";
import styles from "./components.module.scss";
import { useTheme } from "../../../../context/ThemeProvider";
import { isDefined } from "../../../../tools/commons";
import { IoIosWarning } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import FaqUpdateDialogForm from "./DialogForms/FaqUpdateDialogForm";
import { FaqInfo } from "../../../../types/faqs";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import FaqCreateDialogForm from "./DialogForms/FaqCreateDialogForm";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import { successToast } from "../../../../constants/toasts";

type FaqSectionProps = {
  specieId: string;
};

const FaqSection = (props: FaqSectionProps) => {
  const { specieId } = props;
  const { colors } = useTheme();
  const [openFaqsDialog, setOpenFaqsDialog] = useState(false);
  const [openCreateFaqDialog, setOpenCreateFaqDialog] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqInfo>();
  const queryClient = useQueryClient();

  const { data: faqsData } = useQuery({
    queryKey: ["faqs", specieId],
    queryFn: () => {
      return getFaqsBySpecie({
        specieId: specieId,
      });
    },
  });

  const { mutate: deleteFaqMutation } = useMutation({
    mutationFn: () => {
      return deleteFaq(selectedFaq?.id || "", {
        specieId: specieId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs", specieId]);
      successToast("Faq deleted successfully!");
    },
  });

  return (
    <div
      className={styles.faqSectionContainer}
      style={{
        border: `1px solid ${colors.primary_color}`,
      }}
    >
      <TextComponent content="FAQs" animation={false} hover={false} />
      {faqsData?.map((faq, index) => {
        return (
          <div
            className={styles.faqContainer}
            key={index}
            style={{ borderBottom: `1px dashed ${colors.primary_color}` }}
          >
            <p
              className={styles.question}
              style={{ color: colors.text_02_color }}
            >
              {faq.question}
            </p>
            <p className={styles.answer}>{faq.answer}</p>
            {isDefined(faq.warning) && (
              <div
                className={styles.warningContainer}
                style={{
                  backgroundColor: colors.primary_color,
                  color: colors.text_color,
                }}
              >
                <IoIosWarning className={styles.warningIcon} />
                <p className={styles.warning}>{faq.warning}</p>
              </div>
            )}
            <div className={styles.iconsContainer}>
              <FaEdit
                className={styles.actionIcon}
                style={{
                  color: colors.primary_color,
                }}
                onClick={() => {
                  setSelectedFaq(faq);
                  setOpenFaqsDialog(true);
                }}
              />
              <MdDelete
                className={styles.actionIcon}
                style={{
                  color: colors.primary_color,
                }}
                onClick={() => {
                  setSelectedFaq(faq);
                  deleteFaqMutation();
                }}
              />
            </div>
          </div>
        );
      })}
      {isDefined(selectedFaq) && (
        <FaqUpdateDialogForm
          open={openFaqsDialog}
          handleClose={() => setOpenFaqsDialog(false)}
          currentFaq={selectedFaq}
          specieId={specieId}
        />
      )}
      <FaqCreateDialogForm
        open={openCreateFaqDialog}
        handleClose={() => setOpenCreateFaqDialog(false)}
        specieId={specieId}
      />
      <IoAddCircleSharp
        className={styles.addFaqButton}
        style={{
          color: colors.primary_color,
        }}
        onClick={() => setOpenCreateFaqDialog(true)}
      />
    </div>
  );
};

export default FaqSection;
