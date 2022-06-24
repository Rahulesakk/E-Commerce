const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  console.log(req.headers);//tokens
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    //   console.log("fiebase user in auth check", firebaseUser);
      req.user = firebaseUser;
      next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "Invalid or expired token" });
  }
//   next();
};
