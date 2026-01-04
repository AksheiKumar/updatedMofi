import { useAuth } from "../auth/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>
        Welcome, {user.name?.split(" ")[0]}
      </h2>

      <p>{user.email}</p>
      <img src={user.picture} alt="profile" />
    </div>
  );
};
export default ProfilePage;