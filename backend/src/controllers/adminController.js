export const authAdmin = async (req, res) => {
  try {
    const admin = req.admin; //Get from authMiddleware

    return res.status(200).json({ admin });
  } catch (error) {
    console.error('Có lỗi khi gọi authAdmin', admin);
    return res.status(500).json({ message: 'Lỗi hệ thống tại AuthAdmin' });
  }
};