import mongoose from "mongoose";
const connect = async () => {
  try {
    console.log(`Attempting Connection To DB...`);
    const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: `MERN-Chat-Application`,
    });
    console.log(`##############-Connected TO DB Successfully -##############`);

    console.log(`Host - ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export default connect;
