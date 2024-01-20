import { Container, Dialog } from "@mui/material";
import { useQuery } from "react-query";
import { getFaqsBySpecie } from "../../../api/faqs";
import styles from "./FaqsDialog.module.scss";
import { useTheme } from "../../../context/ThemeProvider";
import { IoIosWarning } from "react-icons/io";
import { isDefined } from "../../../tools/commons";
import { AiFillCloseCircle } from "react-icons/ai";

type FaqsDialogProps = {
  open: boolean;
  handleClose: () => void;
  specieId: string;
};

const FaqsDialog = (props: FaqsDialogProps) => {
  const { open, handleClose, specieId } = props;
  const { colors } = useTheme();

  const { data: faqsData } = useQuery({
    queryKey: ["faqs", specieId],
    queryFn: () => {
      return getFaqsBySpecie({
        specieId: specieId,
      });
    },
    enabled: open,
  });

  return (
    <Dialog
      className={styles.faqsDialogContainer}
      open={open}
      onClose={handleClose}
      maxWidth={"xl"}
      PaperProps={{
        style: {
          borderRadius: "20px",
          backgroundColor: colors.CTX_FORM_CONTAINER_COLOR,
        },
        sx: {
          //-webkit-scrollbar
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "20px",
          },

          "&::-webkit-scrollbar-thumb": {
            background: colors.CTX_MENUBAR_COLOR,
            borderRadius: "20px",
          },
        },
      }}
    >
      <Container className={styles.faqsContainer}>
        <AiFillCloseCircle
          className={styles.exitIcon}
          style={{ color: colors.CTX_BUTTON_COLOR }}
          onClick={handleClose}
        />
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
            </div>
          );
        })}
      </Container>
    </Dialog>
  );
};

export default FaqsDialog;
