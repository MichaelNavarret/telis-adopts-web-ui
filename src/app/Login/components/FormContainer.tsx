import styles from "./FormContainer.module.scss";

type FormContainerProps = {
  backGroundColor: string;
  children: React.ReactNode;
};

const FormContainer = (props: FormContainerProps) => {
  const { backGroundColor, children } = props;

  return (
    <div
      className={styles.formContainer}
      style={{
        backgroundColor: backGroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default FormContainer;
