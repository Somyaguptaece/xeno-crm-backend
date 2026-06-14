const authMiddleware = (req, res, next) => {

  req.user = {
    id: 1,
    name: "Demo User",
    email: "demo@xeno.com",
  };

  next();

};

module.exports = authMiddleware;