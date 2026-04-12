import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    //@ts-ignore
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('::: Kết nối database thành công');
  } catch (error) {
    console.log('::: Lỗi khi kết nối cơ sở dữ liệu!', error);
    process.exit(1);
  }
};
