export type UserSigninCred = { email: string; password: string };
export type UserSignupCred = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryId: number;
  newsletter?: boolean;
};

export type UserAuthorized = {
  firstName: string;
  lastName: string;
  token: string;
  userImage?: string;
  roles: string[];
};

export type User = {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhone: string;
  userImage: string;
  regsiterDate: Date;
  roles: string[];
};
