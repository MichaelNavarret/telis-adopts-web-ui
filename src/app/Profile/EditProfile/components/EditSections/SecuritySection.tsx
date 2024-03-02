import { FormEvent, useState } from "react";
import {
  OwnerSingletonResponse,
  OwnerUpdateRequest,
} from "../../../../../types/owner";
import styles from "./SecuritySection.module.scss";
import TextFieldComponent from "../../../../../components/Form/TextFieldComponent";
import { Button } from "../../../../../components";
import { errorToast, successToast } from "../../../../../constants/toasts";
import TextComponent from "../../../../../components/TextComponents/TextComponent";
import strings from "../../../../../l10n";
import { useTheme } from "../../../../../context/ThemeProvider";
import { Switch } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { updateOwner } from "../../../../../api/owners";

type SecuritySectionProps = {
  owner: OwnerSingletonResponse | undefined;
};

export const SecuritySection = (props: SecuritySectionProps) => {
  const { owner } = props;
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const { mutate: updateOwnerSecurity, isLoading: isOwnerSecurityLoading } =
    useMutation({
      mutationFn: (data: OwnerUpdateRequest) => {
        return updateOwner(owner?.ownerSingletonInfo.id || "", data);
      },
      onSuccess: () => {
        successToast(strings.OWNER_UPDATED_SUCCESSFULLY);
        queryClient.invalidateQueries("ownerEdit");
        setNewPassword("");
        setConfirmNewPassword("");
      },
    });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      errorToast(strings.PASSWORD_NOT_MATCH);
      return;
    }
    updateOwnerSecurity({ password: newPassword });
  };

  const handleSwitch = (checked: boolean) => {
    updateOwnerSecurity({ skip2fa: checked });
  };

  return (
    <div className={styles.securitySection_mainContainer}>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        className={styles.securitySection_PasswordSection}
        style={{
          border: "1px dashed " + colors.CTX_BORDER_ICON_COLOR,
        }}
      >
        <TextComponent
          animation={false}
          hover={false}
          fontSize="medium"
          content={strings.CHANGE_PASSWORD}
        />
        <div className={styles.passwordSection_fieldsContainer}>
          <TextFieldComponent
            id="newPassword"
            label={strings.NEW_PASSWORD}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextFieldComponent
            id="confirmNewPassword"
            label={strings.CONFIRM_PASSWORD}
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <Button
          className={styles.passwordSection_submitButton}
          type="submit"
          content={strings.CHANGE_PASSWORD}
          width="250px"
          height="40px"
          fontSize="10px"
          withShadow={false}
        />
      </form>
      <div
        className={styles.securitySection_Skip2faSection}
        style={{
          border: "1px dashed " + colors.CTX_BORDER_ICON_COLOR,
        }}
      >
        <TextComponent
          animation={false}
          hover={false}
          fontSize="medium"
          content={strings.SKIP_2FA}
        />
        <Switch
          checked={owner?.ownerSingletonInfo.skip2fa}
          onChange={(e) => handleSwitch(e.target.checked)}
          disabled={isOwnerSecurityLoading}
          style={{
            color: colors.CTX_BORDER_ICON_COLOR,
          }}
          sx={{
            "& .MuiSwitch-track": {
              backgroundColor: colors.CTX_BORDER_ICON_COLOR,
            },
          }}
        />
      </div>
    </div>
  );
};
