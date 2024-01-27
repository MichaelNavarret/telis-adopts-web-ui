import { FormEvent, useEffect, useState } from "react";
import { FaqInfo } from "../../../../types/faqs";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { Button } from "../../../../components";
import DialogComponent from "../../../../components/surfaces/DialogComponent";

type FaqDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  currentFaq: FaqInfo;
};

const FaqDialogForm = (props: FaqDialogFormProps) => {
  const { open, handleClose, currentFaq } = props;
  const [faq, setFaq] = useState<FaqInfo>(currentFaq);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit:", e);
  };

  useEffect(() => {
    setFaq(currentFaq);
  }, [currentFaq]);

  const dialogContent = (
    <form onSubmit={onSubmit}>
      <div key={faq.id} style={{ marginBottom: "20px" }}>
        <TextFieldComponent
          label="Question"
          type="text"
          id="question"
          value={faq.question}
          fullWidth
          multiline
          onChange={(e) => setFaq({ ...faq, question: e.target.value })}
        />
        <TextFieldComponent
          label="Answer"
          type="text"
          id="answer"
          value={faq.answer}
          fullWidth
          multiline
          onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
        />
        <TextFieldComponent
          label="Warning"
          type="text"
          id="warning"
          fullWidth
          multiline
          value={faq.warning}
          onChange={(e) => setFaq({ ...faq, warning: e.target.value })}
        />
      </div>
      );
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

export default FaqDialogForm;
