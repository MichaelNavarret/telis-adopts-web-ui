import { useParams } from "react-router-dom";
import ProfileScreen from "../../app/Profile/ProfileScreen";

const ProfileScreenPage = () => {
  const { ownerId } = useParams();

  return <ProfileScreen ownerId={ownerId} />;
};

export default ProfileScreenPage;
