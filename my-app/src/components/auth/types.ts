export interface ILoginUser {
  email: string;
  password: string;
  reCaptchaToken: string;
}

export interface IRegisterUser {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  image: File | null;
  reCaptchaToken: string;
  confirmPassword: string;
}

