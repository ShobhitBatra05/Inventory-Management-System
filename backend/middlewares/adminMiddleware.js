const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send("Access denied.");
    }
    next();
  };

  // const registerUser = async (userData) => {
  //   if (userData.role === 'admin') {
  //     // Logic to check if the user is authorized to be an admin
  //     throw new Error("Unauthorized role assignment.");
  //   }
  //   // Save user data to the database
  // };
  
  