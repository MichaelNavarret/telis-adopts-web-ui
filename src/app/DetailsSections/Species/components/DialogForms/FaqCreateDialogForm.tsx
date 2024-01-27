import { FormEvent, useState } from "react";
import { FaqCreationRequest } from "../../../../../types/faqs";
import TextFieldComponent from "../../../../../components/Form/TextFieldComponent";
import { Button } from "../../../../../components";
import DialogComponent from "../../../../../components/surfaces/DialogComponent";
import { useMutation, useQueryClient } from "react-query";
import { createFaq } from "../../../../../api/faqs";
import { successToast } from "../../../../../constants/toasts";
import styles from "./FaqUpdateDialogForm.module.scss";
import TextComponent from "../../../../../components/TextComponents/TextComponent";

type FaqCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  specieId: string;
};

type FaqFormFields = {
  question?: string | null;
  answer?: string | null;
  warning?: string | null;
};

const FaqCreateDialogForm = (props: FaqCreateDialogFormProps) => {
  const { open, handleClose, specieId } = props;
  const [faq, setFaq] = useState<FaqFormFields>();
  const queryClient = useQueryClient();

  const { mutate: updateFaqMutation } = useMutation({
    mutationFn: (data: FaqCreationRequest) => {
      return createFaq(data);
    },
    onSuccess: () => {
      successToast("Faq Crated successfully!");
      queryClient.invalidateQueries(["faqs", specieId]);
      setFaq({
        question: null,
        answer: null,
        warning: null,
      });
      handleClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: FaqCreationRequest = {
      question: faq?.question || "",
      answer: faq?.answer || "",
      warning: faq?.warning,
      specieId: specieId,
    };
    updateFaqMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.faqUpdateDialogFormContainer}>
      <div className={styles.faqContainer}>
        <TextComponent
          content="Create a new FAQ"
          animation={false}
          hover={false}
          className={styles.faqFormTitle}
        />
        <TextFieldComponent
          className={styles.faqInput}
          label="Question"
          type="text"
          id="question"
          value={faq?.question}
          fullWidth
          multiline
          onChange={(e) => setFaq({ ...faq, question: e.target.value })}
          required
        />
        <TextFieldComponent
          className={styles.faqInput}
          label="Answer"
          type="text"
          id="answer"
          value={faq?.answer}
          fullWidth
          multiline
          onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
          required
        />
        <TextFieldComponent
          className={styles.faqInput}
          label="Warning"
          type="text"
          id="warning"
          fullWidth
          multiline
          value={faq?.warning}
          onChange={(e) => setFaq({ ...faq, warning: e.target.value })}
        />
      </div>
      <Button type="submit">Save</Button>
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

export default FaqCreateDialogForm;
