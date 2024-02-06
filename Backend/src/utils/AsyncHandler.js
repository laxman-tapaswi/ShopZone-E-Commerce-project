const AsyncHandler = (Fun) => async (re, res, next) => {
  return new Promise.resolve(Fun(req, res)).catch(next);
};

module.exports = AsyncHandler;
