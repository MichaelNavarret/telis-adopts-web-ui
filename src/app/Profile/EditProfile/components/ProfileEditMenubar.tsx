import MenuBar from "../../../../components/MenuBar/MenuBar";
import styles from "./ProfileEditMenubar.module.scss";

type ProfileEditMenubarProps = {
  handleStepChange: (value: number) => void;
};

const ProfileEditMenubar = (props: ProfileEditMenubarProps) => {
  const { handleStepChange } = props;
  const options = [
    { label: "Information", value: 0 },
    { label: "Icon", value: 1 },
    { label: "My badges", value: 5 },
    { label: "Characters", value: 2 },
    { label: "Favorites", value: 3 },
    { label: "Security", value: 4 },
  ];

  return (
    <div className={styles.profileEditMenubar_mainContainer}>
      <MenuBar
        className={styles.profileEditMenubar_menuBar}
        menuListClassName={styles.profileEditMenubar_menuList}
        menuItemClassName={styles.profileEditMenubar_menuItem}
        options={options}
        handleClick={handleStepChange}
      />
    </div>
  );
};

export default ProfileEditMenubar;
