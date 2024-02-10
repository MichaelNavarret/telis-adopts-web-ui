import { useParams } from "react-router-dom";
import ProfileEditScreen from "../../../app/Profile/EditProfile/ProfileEditScreen";
import useUserSession from "../../../hooks/useUserSession";

const ProfileEditPage = () => {
  const { ownerId } = useParams();
  const { ownerInfo } = useUserSession();

  if (ownerId !== ownerInfo?.id) return <div>Unauthorized</div>;

  if (!ownerId) return <div>Invalid owner id</div>;

  return <ProfileEditScreen ownerId={ownerId} />;
};

export default ProfileEditPage;
