import styles from "./ImageExpositor.module.scss";

type ImageExposiorProps = {
  src: string;
  alt: string;
  classNameImage: string;
  onClick?: () => void;
};

const ImageExpositor = (props: ImageExposiorProps) => {
  const { src, alt, classNameImage, onClick } = props;

  return (
    <div className={styles.imgContainer}>
      <img
        src={src}
        alt={alt}
        className={`${styles.imgStyles} ${classNameImage}`}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageExpositor;
