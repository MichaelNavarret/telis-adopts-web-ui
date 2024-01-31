type ProfileScreenProps = {
  ownerId?: string;
};

const ProfileScreen = (props: ProfileScreenProps) => {
  const { ownerId } = props;
  return (
    <div>
      <h1>Profile: {ownerId}</h1>
    </div>
  );
};

export default ProfileScreen;
