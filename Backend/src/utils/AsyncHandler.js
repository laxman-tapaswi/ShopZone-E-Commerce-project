const AsyncHandler = (Fun) => async (req, res, next) => {
  Promise.resolve(Fun(req, res, next)).catch(next);
};

module.exports = AsyncHandler;
