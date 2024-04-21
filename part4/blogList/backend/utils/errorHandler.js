const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === "CastError") {
    return res.status(404).json({ error: error.message });
  }
  next(error);
};

module.exports = errorHandler;
