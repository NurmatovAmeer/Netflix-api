const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
          return res.status(403).json({ message: "Tokenn is not valid" });
        req.user = user;
        next();
      });
    }
  } else {
    return res.status(401).json({ meassage: "you aree not authenticated" });
  }
}

module.exports = verify;
