import {Document, Schema, model} from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';
 
export interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}
const UserSchema = new Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function(next){ 
    let user = this as UserDocument;

    if(!user.isModified('password')) return next(); 

    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hash(user.password, salt); 
    
    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
){
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(()=> false);
}

const User = model<UserDocument>('User', UserSchema);
export default User;