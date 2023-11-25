module.exports = {
  notFoundError: function (errorMessage = "Not Found") {
    const err = new Error(errorMessage);
    err.status = 404;
    return err;
  },
};
