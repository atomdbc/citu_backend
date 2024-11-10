// middlewares/validator.js
export const validateWaitlistData = (req, res, next) => {
    const { fullName, mobile } = req.body;
    
    if (!fullName || !mobile) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        details: 'Full name and mobile number are required'
      });
    }
    
    next();
  };