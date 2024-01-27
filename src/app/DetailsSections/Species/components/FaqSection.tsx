import { useQuery } from "react-query";
import { getFaqsBySpecie } from "../../../../api/faqs";
import styles from "./components.module.scss";
import { useTheme } from "../../../../context/ThemeProvider";
import { isDefined } from "../../../../tools/commons";
import { IoIosWarning } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import FaqDialogForm from "./FaqDialogForm";
import { FaqInfo } from "../../../../types/faqs";

type FaqSectionProps = {
  specieId: string;
};

const FaqSection = (props: FaqSectionProps) => {
  const { specieId } = props;
  const { colors } = useTheme();
  const [openFaqsDialog, setOpenFaqsDialog] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqInfo>();

  const { data: faqsData } = useQuery({
    queryKey: ["faqs", specieId],
    queryFn: () => {
      return getFaqsBySpecie({
        specieId: specieId,
      });
    },
  });

  return (
    <div className={styles.faqSectionContainer}>
      {faqsData?.map((faq, index) => {
        return (
          <div
            className={styles.faqContainer}
            key={index}
            style={{ borderBottom: `1px dashed ${colors.CTX_BUTTON_COLOR}` }}
          >
            <p
              className={styles.question}
              style={{ color: colors.CTX_FORM_TITLE_COLOR }}
            >
              {faq.question}
            </p>
            <p className={styles.answer}>{faq.answer}</p>
            {isDefined(faq.warning) && (
              <div
                className={styles.warningContainer}
                style={{
                  backgroundColor: colors.CTX_BUTTON_COLOR,
                  color: colors.CTX_TEXT_COLOR,
                }}
              >
                <IoIosWarning className={styles.warningIcon} />
                <p className={styles.warning}>{faq.warning}</p>
              </div>
            )}
            <FaEdit
              style={{
                color: colors.CTX_BUTTON_COLOR,
              }}
              onClick={() => {
                setSelectedFaq(faq);
                setOpenFaqsDialog(true);
              }}
            />
          </div>
        );
      })}
      {isDefined(selectedFaq) && (
        <FaqDialogForm
          open={openFaqsDialog}
          handleClose={() => setOpenFaqsDialog(false)}
          currentFaq={selectedFaq}
        />
      )}
    </div>
  );
};

export default FaqSection;
