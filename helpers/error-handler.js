function errorHandler(err, res, req, next) {
  if (err.name === "UnauthorizedError") {
    // jwt auth error
    return res.status(401).json({ message: "The user is not authorized" }); // backendde gerceklesen her tur hata icin
  }

  if (err.name === "ValidationError") {
    // validation error
    return res.status(401).json({ message: err }); // backendde gerceklesen her tur hata icin
  }

  // default to 500 server errors
  return res.status(500).json(err);
}
module.exports = errorHandler; //
