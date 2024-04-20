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
          backgroundColor: colors.secondary_color,
        },
        sx: {
          //-webkit-scrollbar
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "20px",
          },

          "&::-webkit-scrollbar-thumb": {
            background: colors.primary_color,
            borderRadius: "20px",
          },
        },
      }}
    >
      <Container className={styles.faqsContainer}>
        <AiFillCloseCircle
          className={styles.exitIcon}
          style={{ color: colors.primary_color }}
          onClick={handleClose}
        />
        {faqsData?.map((faq, index) => {
          return (
            <div
              className={styles.faqContainer}
              key={index}
              style={{ borderBottom: `1px dashed ${colors.primary_color}` }}
            >
              <p
                className={styles.question}
                style={{ color: colors.text_03_color }}
              >
                {faq.question}
              </p>
              <p className={styles.answer}>{faq.answer}</p>
              {isDefined(faq.warning) && (
                <div
                  className={styles.warningContainer}
                  style={{
                    backgroundColor: colors.primary_color,
                    color: colors.text_02_color,
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
