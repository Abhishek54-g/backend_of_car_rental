const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Default values
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Server Error";
  
    // 🔹 Mongoose Bad ObjectId
    if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID format";
    }
  
    // 🔹 Mongoose Duplicate Key (email unique error)
    if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
    }
  
    // 🔹 Mongoose Validation Error
    if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    }
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorHandler;