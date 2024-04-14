import { useCallback, useState } from "react";
import { useTheme } from "../../../../context/ThemeProvider";
import { useDropzone } from "react-dropzone";
import { isDefined } from "../../../../tools/commons";
import strings from "../../../../l10n";

type BadgeDropzoneProps = {
  handleDrop: (files: File[]) => void;
  fieldId?: string;
  disabled?: boolean;
  className?: string;
};

export const BadgeDropzone = (props: BadgeDropzoneProps) => {
  const { colors } = useTheme();
  const { handleDrop, disabled = false, className } = props;
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleDrop(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {};
      reader.readAsArrayBuffer(file);
      setPreviewImage(URL.createObjectURL(file));
    });
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={className}
      style={{
        backgroundColor: colors.CTX_TABLE_ROW_HOVER_COLOR,
        border: "5px dashed" + colors.CTX_MENUBAR_COLOR,
        cursor: disabled ? "progress" : "pointer",
        filter: disabled ? "grayscale(100%)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!disabled && <input {...getInputProps()} />}
      {!isDefined(acceptedFiles[0]) ? (
        <p>{strings.DROP_BADGE}</p>
      ) : (
        <img
          src={previewImage}
          alt="preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "relative",
          }}
        />
      )}
    </div>
  );
};
