export function shared(): string {
  return 'shared';
}

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  address: string;
  location: {
    lat: number;
    long: number;
  }
}