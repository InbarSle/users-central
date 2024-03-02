import { IUser } from "@users-central/shared";

export type ApiCreateUserReq = Omit<IUser, 'id'>;

export type ApiUpdateUserReq = Partial<ApiCreateUserReq>