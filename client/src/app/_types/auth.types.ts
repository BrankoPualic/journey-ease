export type UserSigninCred = { email: string; password: string };
export type UserSignupCred = {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: number;
  newsletter?: boolean;
};

export type User = {
  firstName: string;
  lastName: string;
  token: string;
  userEmail: string;
  userPhone: string;
  userImage: string;
  regsiterDate: Date;
  roles: string[];
};
