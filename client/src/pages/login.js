import { useState } from "react";
import LoginForm from "../components/login-form";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_ATTEMPTED } from "../store/constants/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_ATTEMPTED, payload: { id: email, password } });
  };

  return (
    <LoginForm
      error={error}
      onSubmit={handleSubmit}
      email={email}
      loading={loading}
      password={password}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
    />
  );
}

export default Login;
