import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage";

const Login = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdtXUQlAAAAAM8lMwtW5DWqrFhbLFIoP1iVVNqp">
      <LoginPage />
    </GoogleReCaptchaProvider>
  );
};

export default Login;
