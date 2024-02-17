import { FormEvent, useState } from "react";
import ToyhouseIcon from "../../../../../icons/ToyhouseIcon";
import { FaDeviantart, FaDiscord, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import {
  OwnerSingletonResponse,
  OwnerUpdateRequest,
} from "../../../../../types/owner";
import TextFieldComponent from "../../../../../components/Form/TextFieldComponent";
import strings from "../../../../../l10n";
import TextComponent from "../../../../../components/TextComponents/TextComponent";
import styles from "./InformationSection.module.scss";
import { useTheme } from "../../../../../context/ThemeProvider";
import { Button } from "../../../../../components";
import { useMutation, useQueryClient } from "react-query";
import { updateOwner } from "../../../../../api/owners";
import { successToast } from "../../../../../constants/toasts";

type InformationSectionProps = {
  owner: OwnerSingletonResponse | undefined;
};

export const InformationSection = (props: InformationSectionProps) => {
  const { owner } = props;
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [nickName, setNickName] = useState(owner?.ownerSingletonInfo.nickName);
  const [email, setEmail] = useState(owner?.ownerSingletonInfo.email);
  const [devianart, setDevianart] = useState(
    owner?.ownerSingletonInfo.devianart
  );
  const [discord, setDiscord] = useState(owner?.ownerSingletonInfo.discord);
  const [twitter, setTwitter] = useState(owner?.ownerSingletonInfo.twitter);
  const [instagram, setInstagram] = useState(
    owner?.ownerSingletonInfo.instagram
  );
  const [toyhouse, setToyhouse] = useState(owner?.ownerSingletonInfo.toyhouse);

  const {
    mutate: updateOwnerInformationMutation,
    isLoading: isUpdateOwnerInformationLoading,
  } = useMutation({
    mutationFn: (data: OwnerUpdateRequest) => {
      return updateOwner(owner?.ownerSingletonInfo.id || "", data);
    },
    onSuccess: () => {
      successToast(strings.OWNER_UPDATED_SUCCESSFULLY);
      queryClient.invalidateQueries("owner");
      queryClient.invalidateQueries("ownerEdit");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: OwnerUpdateRequest = {
      nickName,
      email,
      devianart,
      discord,
      twitter,
      instagram,
      toyhouse,
    };
    updateOwnerInformationMutation(payload);
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        className={styles.informationSection_mainContainer}
      >
        <div className={styles.informationSection_fieldContainer}>
          <TextComponent
            content={strings.NICKNAME}
            hover={false}
            animation={false}
          />
          <TextFieldComponent
            id="nickName"
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className={styles.informationSection_fieldContainer}>
          <TextComponent
            content={strings.EMAIL}
            hover={false}
            animation={false}
          />
          <TextFieldComponent
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.informationSection_socialMedia_container}>
          <TextComponent
            content={strings.SOCIAL_MEDIA}
            hover={false}
            animation={false}
          />
          <div
            className={
              styles.informationSection_socialMedia_collectionField_container
            }
          >
            <div
              className={styles.informationSection_socialMedia_field_container}
            >
              <FaDeviantart
                className={styles.informationSection_socialMedia_icon}
                fontSize="40px"
                style={{
                  fill: colors.CTX_TEXT_COLOR,
                  background: colors.CTX_BUBBLE_COLOR,
                  padding: "5px",
                }}
              />
              <TextFieldComponent
                className={styles.informationSection_socialMedia_field}
                id="devianart"
                type="text"
                value={devianart}
                onChange={(e) => setDevianart(e.target.value)}
              />
            </div>
            <div
              className={styles.informationSection_socialMedia_field_container}
            >
              <FaDiscord
                className={styles.informationSection_socialMedia_icon}
                fontSize="40px"
                style={{
                  fill: colors.CTX_TEXT_COLOR,
                  background: colors.CTX_BUBBLE_COLOR,
                  padding: "5px",
                }}
              />
              <TextFieldComponent
                className={styles.informationSection_socialMedia_field}
                id="discord"
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>
            <div
              className={styles.informationSection_socialMedia_field_container}
            >
              <FaTwitter
                className={styles.informationSection_socialMedia_icon}
                fontSize="40px"
                style={{
                  fill: colors.CTX_TEXT_COLOR,
                  background: colors.CTX_BUBBLE_COLOR,
                  padding: "5px",
                }}
              />
              <TextFieldComponent
                className={styles.informationSection_socialMedia_field}
                id="twitter"
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div
              className={styles.informationSection_socialMedia_field_container}
            >
              <RiInstagramFill
                className={styles.informationSection_socialMedia_icon}
                fontSize="40px"
                style={{
                  fill: colors.CTX_TEXT_COLOR,
                  background: colors.CTX_BUBBLE_COLOR,
                  padding: "5px",
                }}
              />
              <TextFieldComponent
                className={styles.informationSection_socialMedia_field}
                id="instagram"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div
              className={styles.informationSection_socialMedia_field_container}
            >
              <ToyhouseIcon
                className={styles.informationSection_socialMedia_icon}
                iconColor={colors.CTX_TEXT_COLOR}
                style={{
                  background: colors.CTX_BUBBLE_COLOR,
                  padding: "3px",
                  width: "45px",
                  height: "45px",
                }}
              />
              <TextFieldComponent
                className={styles.informationSection_socialMedia_field}
                id="toyhouse"
                type="text"
                value={toyhouse}
                onChange={(e) => setToyhouse(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.informationSection_button_container}>
          <Button
            className={styles.informationSection_submitButton}
            content={strings.SAVE}
            withShadow={false}
            width="100px"
            height="40px"
            disabled={isUpdateOwnerInformationLoading}
            loading={isUpdateOwnerInformationLoading}
            catsLoading={isUpdateOwnerInformationLoading}
          />
        </div>
      </form>
    </div>
  );
};
