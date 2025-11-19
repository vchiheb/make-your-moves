import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  dispatch(logout());
  const navigate = useNavigate();
  navigate("/");
  return <h1>Logout</h1>;
}
