const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default isAuthenticated;
