import styles from "./ImageExpositor.module.scss";

type ImageExposiorProps = {
  src: string;
  alt: string;
  classNameImage: string;
};

const ImageExpositor = (props: ImageExposiorProps) => {
  const { src, alt, classNameImage } = props;

  return (
    <div className={styles.imgContainer}>
      <img
        src={src}
        alt={alt}
        className={`${styles.imgStyles} ${classNameImage}`}
      />
    </div>
  );
};

export default ImageExpositor;
