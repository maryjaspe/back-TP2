function responseFormatter(req, res, next) {
  res.standardSend = (data, error = null, statusCode = 200) => {
    const response = {
      data: data,
      error: error
    };
    res.status(statusCode).json(response);
  };
  next();
}

module.exports = responseFormatter;