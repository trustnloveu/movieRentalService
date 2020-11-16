// to remove repeative try-catch blocks
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler();
    } catch (ex) {
      next();
    }
  };
};
