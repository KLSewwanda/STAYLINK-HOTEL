import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            unique : true,
            required : [true, "Email is required"],
        },
        firstName : {
            type : String,
            required : [true, "First name is required"],
        },
        lastName : {
            type : String,
            required : [true, "Last name is required"],
        },
        password : {
            type : String,
            required : [true, "Password is required"],
        },
        isAdmin : {
            type : Boolean,
            required : true,
            default : false,
        },
        isBlocked : {
            type : Boolean,
            required : true,
            default : false,
        },
        isEmailVerified : {
            type : Boolean,
            required : true,
            default : false,
        },
        image : {
            type : String,
            required : true,
            default : "/default-profile.png",
        }

    }
)

const User = mongoose.model("User", userSchema)

export default User