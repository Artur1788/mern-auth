export interface UserData {
  accessToken?: string;
  id: string;
  _id?: string;
  email: string;
  name: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthStore {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: null | string;
  checkAuth: () => Promise<void>;
  signup: (data: SignupCredentials) => Promise<void>;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
