import RegisterPage from "./RegisterPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Register = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdtXUQlAAAAAM8lMwtW5DWqrFhbLFIoP1iVVNqp">
      <RegisterPage />
    </GoogleReCaptchaProvider>
  );
};

export default Register;
