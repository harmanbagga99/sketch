const sendErrorDev = (err, req, res) => {
  console.log("err", err.message);
  const resp = {
    error: true,
    message: err.message,
  };
  return res.status(err.statusCode || 500).json(resp);
};

const sendErrorprod = (err, req, res) => {
  if (err.statusCode) {
    const resp = {
      error: true,
      message: err.message,
    };
    return res.status(err.statusCode || 500).json(resp);
  } else {
    const resp = {
      error: true,
      message: "Something went wrong",
    };
    return res.status(500).json(resp);
  }
};
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorprod(err, req, res);
  }
};
