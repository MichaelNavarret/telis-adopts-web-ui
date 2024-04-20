import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "../../context/ThemeProvider";
import { isDefined } from "../../tools/commons";
import strings from "../../l10n";

type DropzoneProps = {
  handleDrop: (files: File[], fieldId?: string) => void;
  fieldId?: string;
  disabled?: boolean;
};

const Dropzone = (props: DropzoneProps) => {
  const { colors } = useTheme();
  const { handleDrop, fieldId, disabled = false } = props;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleDrop(acceptedFiles, fieldId);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        width: "500px",
        backgroundColor: colors.selected_color,
        padding: "10px",
        borderRadius: "15px",
        border: "5px dashed" + colors.primary_color,
        textAlign: "center",
        cursor: disabled ? "progress" : "pointer",
        filter: disabled ? "grayscale(100%)" : "none",
      }}
    >
      {!disabled && <input {...getInputProps()} />}
      {!isDefined(acceptedFiles[0]) ? (
        <p>{strings.DRAG_AND_DROP}</p>
      ) : (
        <div>{acceptedFiles[0].name}</div>
      )}
    </div>
  );
};

export default Dropzone;
