import styles from "./NavigationBubbles.module.scss";
import { FaHome } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import useUserSession from "../../hooks/useUserSession";
import DialogComponent from "./DialogComponent";
import { useState } from "react";
import { Button } from "..";
import strings from "../../l10n";

const NavigationBubbles = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { logout } = useUserSession();
  const [showDialog, setShowDialog] = useState(false);

  const styleConfig = {
    backgroundColor: colors.primary_color,
    color: colors.text_02_color,
  };

  const dialogContent = (
    <div className={styles.dialogContainer}>
      <p>{strings.ARE_SURE_TO_EXIT}</p>
      <Button
        content={strings.EXIT}
        onClick={() => confirmLogout()}
        withShadow={false}
        height="40px"
        width="200px"
      />
    </div>
  );

  const confirmLogout = () => {
    logout();
    setShowDialog(false);
  };

  return (
    <>
      <div className={styles.navigationBubblesContainer}>
        <div
          className={styles.bubble}
          style={styleConfig}
          onClick={() => navigate("/species")}
        >
          <FaHome className={styles.iconBubble} />
        </div>

        <div
          className={styles.bubble}
          style={styleConfig}
          onClick={() => setShowDialog(true)}
        >
          <RiLogoutBoxLine className={styles.iconBubble} />
        </div>
      </div>
      <DialogComponent
        open={showDialog}
        content={dialogContent}
        handleClose={() => setShowDialog(false)}
      />
    </>
  );
};

export default NavigationBubbles;
