// import mongoose from "mongoose";

// export async function dbConnect() {
//     try {
//         mongoose.connect(process.env.MONGO_URI)
//         const connection = mongoose.connection;

//         connection.on('connected', () => {
//             console.log("MongoDB Connected successfully");
//         })

//         connection.on('error', (err) => {
//             console.log("MongoDB Connection Error: " + err);
//             process.exit();
//         })
//     } catch (error) {
//         console.log("Something went wrong in connecting to database");
//         console.log(error);
//     }
// }