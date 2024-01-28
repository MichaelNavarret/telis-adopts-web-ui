import { FormEvent, useEffect, useState } from "react";
import { FaqInfo, FaqUpdateRequest } from "../../../../../types/faqs";
import TextFieldComponent from "../../../../../components/Form/TextFieldComponent";
import { Button } from "../../../../../components";
import DialogComponent from "../../../../../components/surfaces/DialogComponent";
import { useMutation, useQueryClient } from "react-query";
import { updateFaq } from "../../../../../api/faqs";
import { successToast } from "../../../../../constants/toasts";
import styles from "./FaqUpdateDialogForm.module.scss";
import TextComponent from "../../../../../components/TextComponents/TextComponent";

type FaqUpdateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  currentFaq: FaqInfo;
  specieId: string;
};

const FaqUpdateDialogForm = (props: FaqUpdateDialogFormProps) => {
  const { open, handleClose, currentFaq, specieId } = props;
  const [faq, setFaq] = useState<FaqInfo>(currentFaq);
  const queryClient = useQueryClient();

  const { mutate: updateFaqMutation } = useMutation({
    mutationFn: (data: FaqUpdateRequest) => {
      return updateFaq(faq.id, data, {
        specieId: specieId,
      });
    },
    onSuccess: (data) => {
      successToast("Faq updated successfully!");
      queryClient.invalidateQueries(["faqs", specieId]);
      setFaq({
        ...faq,
        question: data.question,
        answer: data.answer,
        warning: data.warning,
      });
      handleClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: FaqUpdateRequest = {
      question: faq.question,
      answer: faq.answer,
      warning: faq.warning,
    };
    updateFaqMutation(payload);
  };

  useEffect(() => {
    setFaq(currentFaq);
  }, [currentFaq]);

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.faqUpdateDialogFormContainer}>
      <div key={faq.id} className={styles.faqContainer}>
        <TextComponent
          content="Update FAQ"
          animation={false}
          hover={false}
          className={styles.faqFormTitle}
        />
        <TextFieldComponent
          className={styles.faqInput}
          label="Question"
          type="text"
          id="question"
          value={faq.question}
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
          value={faq.answer}
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
          value={faq.warning}
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

export default FaqUpdateDialogForm;
