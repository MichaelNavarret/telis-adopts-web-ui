import { useState } from "react";
import useUserSession from "../../../hooks/useUserSession";
import styles from "./OwnerIconProfile.module.scss";
import { CircularProgress } from "@mui/material";
import { useTheme } from "../../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const OwnerIconProfile = () => {
  const { ownerInfo } = useUserSession();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={styles.ownerIconProfile_MainContainer}
      style={{ border: `12px solid ${colors.CTX_BUBBLE_COLOR}` }}
      onClick={() => navigate(`profile/${ownerInfo?.id}`)}
    >
      <img
        src={ownerInfo?.iconUrl}
        width={"100%"}
        onLoad={() => setIsLoadingImage(false)}
      />

      {isLoadingImage && (
        <CircularProgress className={styles.circularProgress} />
      )}
    </div>
  );
};

export default OwnerIconProfile;
