import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Session from '../models/Session.js';

const ACCESS_TOKEN_TTL = '30m'; //Production nên để 15m
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

export const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({
        message: 'Không thể thiếu email, password, firstName, lastName, phone',
      });
    }
    // Kiểm tra trùng lặp email, số điện thoại
    const duplicateEmail = await User.findOne({ email });
    const duplicatePhone = await User.findOne({ phone });
    if (duplicateEmail) {
      return res.status(401).json({ message: 'Email đã tồn tại!' });
    } else if (duplicatePhone) {
      return res.status(401).json({ message: 'Số điện thoại đã tồn tại!' });
    }
    // Mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Tạo User mới
    await User.create({
      fullname: `${lastName} ${firstName}`,
      email,
      hashedPassword,
      phone,
    });
    // Trả kết quả
    return res.sendStatus(204);
  } catch (error) {
    console.error('Có lỗi khi gọi signUp', error);
    return res.status(500).json({ message: 'Lỗi hệ thống!' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Không thể thiếu email, password',
      });
    }
    // Kiểm tra tồn tại của user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: 'Email hoặc Password không đúng!' });
    }
    // Kiểm tra password mã hóa từ databse
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: 'Email hoặc Password không đúng!' });
    }
    // Nếu hợp lệ thì tạo accessToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );
    //Tạo refreshToken duy trì đăng nhập
    const refreshToken = crypto.randomBytes(64).toString('hex');
    // Tạo session mới để lưu refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expireAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });
    //Trả refreshToken về trong cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: 'none', 
      maxAge: REFRESH_TOKEN_TTL,
    });
    // Trả accessToken về trong res
    return res
      .status(200)
      .json({ message: `User ${user.fullname} đã đăng nhập`, accessToken });
  } catch (error) {
    console.error('Có lỗi khi gọi signIn', error);
    return res.status(500).json({ message: 'Lỗi hệ thống!' });
  }
};

export const signOut = async (req, res) => {
  try {
    // Lấy refresh token từ cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      //Xóa refreshToken trong session
      await Session.deleteOne({ refreshToken: token });
      // Xóa cookie refreshToken
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error('Có lỗi khi gọi signOut', error);
    return res.status(500).json({ message: 'Lỗi hệ thống!' });
  }
};
