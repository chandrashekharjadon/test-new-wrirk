// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         unique: true,
//         required: [true, 'Username is required'],
//     },
//     email: {
//         type: String,
//         unique: true,
//         match: [/.+\@.+\..+/, 'Please use a valid email address'],
//         required: [true, 'Email is required'],
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//     },
//     isVerified: {
//         type: Boolean,
//         default: false,
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date
// })

// const User = mongoose.models.users || mongoose.model("users", userSchema)

// export default User;