export type JwtPayload = {
  sub: number;
  email: string;
  name: string;
};

export interface GoogleUserData {
  id: string;
  email: string;
  name: string;
}
