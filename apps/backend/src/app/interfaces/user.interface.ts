import {Document} from 'mongoose';
import { IUser } from '@users-central/shared';

export interface UserDocument extends Document,Omit<IUser, 'id'>{}
