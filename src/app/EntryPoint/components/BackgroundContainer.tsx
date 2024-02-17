type BackgroundContainerProps = {
  children: React.ReactNode;
  background: string;
};

export const BackgroundContainer = (props: BackgroundContainerProps) => {
  const { children, background } = props;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundContainer;
