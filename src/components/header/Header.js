import { useAuth } from "../../hook/AuthContext";
const Header = () => {
  const { user, signOut } = useAuth();

  if (user) {
  }
};

export default Header;
