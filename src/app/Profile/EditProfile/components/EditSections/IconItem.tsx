import { CircularProgress } from "@mui/material";
import styles from "./IconSection.module.scss";
import { IconInfo } from "../../../../../types/icons";
import { useState } from "react";

type IconItemProps = {
  isLoading: boolean;
  icon: IconInfo;
  handleClick: (id: string) => void;
};

export const IconItem = (props: IconItemProps) => {
  const { icon, handleClick } = props;
  const [loading, setLoading] = useState(false);

  const handleClickIcon = () => {
    handleClick(icon.id);
    setLoading(true);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <img
          className={styles.iconSection_icon}
          key={icon.id}
          src={icon.iconUrl}
          alt="Icon"
          width={"100%"}
          style={{
            margin: "10px",
          }}
          onClick={handleClickIcon}
        />
      )}
    </>
  );
};
