import styles from "./ImageExpositor.module.scss";

type ImageExpositorProps = {
  src: string;
  alt: string;
  classNameImage?: string;
  onClick?: () => void;
  align?:
    | "center"
    | "end"
    | "justify"
    | "left"
    | "match-parent"
    | "right"
    | "start";
  disabledHover?: boolean;
};

const ImageExpositor = (props: ImageExpositorProps) => {
  const {
    src,
    alt,
    classNameImage,
    onClick,
    align = "center",
    disabledHover = false,
  } = props;

  return (
    <div
      className={styles.imgContainer}
      style={{
        textAlign: align,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "70%",
        }}
        className={`${
          disabledHover ? styles.imgStylesWithoutHover : styles.imgStyles
        } ${classNameImage}`}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageExpositor;
