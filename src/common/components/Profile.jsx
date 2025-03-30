import { useSelector } from "react-redux";
import EditProfile from "./EditProfile.jsx";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user && <EditProfile user={user}/>;
};
export default Profile;
