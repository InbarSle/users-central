import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Location } from '../dto/location.dto'

@Schema() 
export class User {
    @Prop()
    fullname: String;

    @Prop()
    address: String;

    @Prop()
    email: String;

    @Prop({type: Location})
    location: {
        lat: {type: Number},
        long: {type: Number}
    }
}

export const UserSchema = SchemaFactory.createForClass(User)