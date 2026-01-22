import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

export enum UserRole{
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}


@Schema({timestamps:true})
export class User {
    readonly userId?: string;

    @Prop({required:true})
    username:string;

    @Prop({required:true,unique:true,lowercase:true,trim:true})
    email:string;

    @Prop({required:true})
    firstName:string;

    @Prop({required:true})
    lastName:string;

    @Prop({required:true})
    password:string;


    @Prop({enum:UserRole,default:UserRole.USER})
    role:UserRole;

    @Prop({unique:true,sparse:true})
    phoneNumber:string;

    @Prop({default:false})
    isWhatsAppNumber:boolean;

    @Prop({default:false})
    isEmailVerified:boolean;

    @Prop({default:false})
    isPhoneNumberVerified:boolean;


    // ?preference communication method
    @Prop({
        type:{
            email :{type:Boolean,default:true},
            sms :{type:Boolean,default:true},
            whatsapp :{type:Boolean,default:true},
        },
        default:{}
        
    })
    communicationPreferences:{
        email:boolean,
        sms:boolean,
        whatsapp:boolean,
    };


    @Prop({default:true})
    isActive:boolean;

    @Prop()
    resetPasswordToken:string;

    @Prop()
    resetPasswordTokenExpiry:Date;

}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, password, __v, ...rest } = ret;
    return rest;
  },
});
