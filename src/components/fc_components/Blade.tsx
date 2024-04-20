import { ReactNode } from "react";
import MuiDrawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import styles from "./Blade.module.scss";
import { CircularProgress } from "@mui/material";
import Container from "./Container";
import Button, { ButtonProps } from "../surfaces/Button";
import { useTheme } from "../../context/ThemeProvider";
import TextComponent from "../TextComponents/TextComponent";

const sizes = {
  sm: 600,
  md: 892,
  lg: 1168,
};

type BladeProps = {
  /** The position specifies the position of the blade on the screen.*/
  position?: "top" | "bottom" | "left" | "right";
  /** The open determines whether the blade is open or closed.*/
  open: boolean;
  /** The onClose is a function that is called when the blade is closed.*/
  onClose: () => void;
  /** The hideBackdrop determines whether the backdrop behind the blade is hidden or not.*/
  hideBackdrop?: boolean;
  /** The sx is an object containing custom styles to be applied to the blade.*/
  sx?: object;
  /** The variant specifies the type of blade to be displayed.*/
  variant?: "permanent" | "persistent" | "temporary";
  /** The className is a string containing additional CSS classes to be applied to the blade.*/
  className?: string;
  /** The containerClassName is a string containing additional CSS classes to be applied to the container of the blade.*/
  containerClassName?: string;
  /** The size is used to specify the width of the Blade component. It can be set to one of three string values: "sm", "md", or "lg", which correspond to pre-defined widths of 600px, 892px, and 1168px respectively. */
  size?: "sm" | "md" | "lg" | number;
  /** The bodyNode is a React node to be displayed in the body of the blade.*/
  bodyNode?: ReactNode;
  /** The headerNode is a React node to be displayed in the header of the blade.*/
  headerNode?: ReactNode;
  /** The footerNode is a React node to be displayed in the footer of the blade. */
  footerNode?: ReactNode;
  /** The footerBtns is an object containing the properties of the primary and secondary buttons in the footer of the blade.*/
  footerBtns?: {
    primary: ButtonProps;
    secondary?: ButtonProps;
  };
  /** The footerInfo variable contains the additional information to be displayed in the footer of the sheet.*/
  footerInfo?: string;
  /** The title is used to specify the title of the Blade component. It is displayed in the header section of the Blade along with a close button.*/
  title?: string;
  /** The loading determines whether a loading spinner is displayed in the header of the blade. */
  loading?: boolean;

  bodyLoading?: boolean;
};

type DrawerHeaderProps = Pick<BladeProps, "title" | "loading" | "onClose">;
const DrawerHeader = (props: DrawerHeaderProps) => {
  return (
    <Container className={styles.headerContainer}>
      <Container className={styles.headerContent}>
        <TextComponent
          content={props.title}
          animation={false}
          hover={false}
          className={styles.title}
          fontSize="large"
        />
        <IconButton onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </Container>
    </Container>
  );
};

type DrawerBodyProps = Pick<BladeProps, "bodyNode" | "bodyLoading">;
const DrawerBody = (props: DrawerBodyProps) => {
  return (
    <Container className={styles.bodyContainer}>
      {props.bodyLoading ? (
        <CircularProgress
          size={60}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <Container className={styles.bodyContent}>{props.bodyNode}</Container>
      )}
    </Container>
  );
};

type DrawerFooterProps = Pick<BladeProps, "footerInfo" | "footerBtns">;
const DrawerFooter = (props: DrawerFooterProps) => {
  const { primary, secondary } = props.footerBtns || {};
  return (
    <Container className={styles.footerContainer}>
      <Container className={styles.footerContent}>
        <p>{props.footerInfo}</p>
        <Container className={styles.footerBtn}>
          {secondary && <Button {...secondary} />}
          {primary && <Button {...primary} />}
        </Container>
      </Container>
    </Container>
  );
};

const Blade = (props: BladeProps) => {
  const {
    position = "right",
    open = false,
    hideBackdrop = false,
    variant = "temporary",
    onClose,
    sx = {},
    className,
    size = "sm",
    title,
    bodyNode,
    headerNode,
    footerNode,
    containerClassName,
    footerBtns = {
      primary: { content: "Primary" },
      secondary: { content: "Secondary" },
    },
    footerInfo,
    loading = false,
    bodyLoading = false,
  } = props;
  const { colors } = useTheme();
  let width = 600;

  if (typeof size === "string") {
    width = sizes[size];
  }

  if (typeof size === "number") {
    width = size;
  }

  return (
    <MuiDrawer
      anchor={position}
      open={open}
      onClose={onClose}
      hideBackdrop={hideBackdrop}
      sx={sx}
      PaperProps={{
        sx: {
          width: width,
          backgroundColor: colors.secondary_color,
        },
      }}
      variant={variant}
      className={`${containerClassName} ${styles.containerShadow}`}
    >
      {["top", "bottom"].includes(position) ? (
        <Container sx={{ maxHeight: "50vh", minHeight: "50vh" }}>
          <DrawerBody bodyNode={bodyNode} />
        </Container>
      ) : (
        <Container
          className={`${className} ${styles.wrapper}`}
          sx={{ width: width }}
        >
          {headerNode ?? (
            <DrawerHeader title={title} loading={loading} onClose={onClose} />
          )}
          <DrawerBody bodyNode={bodyNode} bodyLoading={bodyLoading} />
          {footerNode ?? (
            <DrawerFooter footerBtns={footerBtns} footerInfo={footerInfo} />
          )}
        </Container>
      )}
    </MuiDrawer>
  );
};

export default Blade;
