const createError = require("http-errors");
// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your request content was not found"));
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error page",
    message: err.message,
  });
}

module.exports = { notFoundHandler, errorHandler };
