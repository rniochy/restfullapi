import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
 
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassord(candidatePassword: string): Promise<Boolean>;
}
const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async (next) =>{ 
    let user:UserDocument = (this as unknown) as UserDocument;

    if(!user.isModified('password')) return next(); 

    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);
    
    user.password = hash;
    next();
});

UserSchema.methods.comparePassord = async function (
    candidatePassword: string
){
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(()=> false);
}

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;