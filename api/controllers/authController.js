const dotEnv = require("dotenv");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { pool } = require("../configs/dbConfig");

dotEnv.config();
let authController = {
  facebookLogin: async (req, res, next) => {
    // respond error if no access token or userid in request body
    const accessToken = req.body.accessToken;
    const fbUserId = req.body.fbUserId;

    if (!accessToken || !fbUserId) {
      return res.status(403).json({
        error: {
          message: "Inalid Facebook accessToken or UserId."
        }
      });
    }

    try {
      //  verify if the accessToken is valid and specific to our app
      let tokenValidateResponse = await fetch(
        `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.FB_CLIENT_ID}|${process.env.FB_CLIENT_SECRET}`
      );

      let tokenValRes = await tokenValidateResponse.json();
      if (tokenValRes.data.is_valid === false) {
        return res.status(403).json({
          error: {
            ...tokenValRes.data.error,
            message: tokenValRes.data.error.message
          }
        });
      }
      // if validity of access token checks out for our app, grab the user profile info
      let userResponse = await fetch(
        `https://graph.facebook.com/${fbUserId}?fields=name,email,picture&access_token=${accessToken}`
      );
      let fbUserRes = await userResponse.json();
      // validate if the userId from response of facebook graph api server is same as the fbuserId passed in the request
      if (fbUserId === fbUserRes.id) {
        // check if the user exists in our database
        const selectQuery = {
          text: `SELECT * FROM users where facebook_id=$1`,
          values: [fbUserRes.id]
        };
        let selectResult = await pool.query(selectQuery);
        console.log(selectResult.rows.length === 0);
        if (selectResult.rows.length === 0) {
          console.log("create...");
          // create new user
          const insertQuery = {
            text:
              "INSERT INTO users (facebook_id,name,email, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [
              fbUserRes.id,
              fbUserRes.name || "",
              fbUserRes.email || "",
              fbUserRes.picture.data.url || ""
            ]
          };
          const createResult = await pool.query(insertQuery);
          console.log(createResult.rows);
          let token = await jwt.sign(
            { user: createResult.rows[0] },
            process.env.JWT_SECRET, { expiresIn: '2h' }
          );
          return res.status(201).json({
            self: req.path,
            user: {
              facebookId: createResult.rows[0].facebook_id,
              name: createResult.rows[0].name,
              profilePicture: createResult.rows[0].profile_picture,
              email: createResult.rows[0].email
            },
            jwt: token
          });
        } else {
          console.log("...existing");
          // return existing user if rows are returned by select query
          // first row gives the user
          let token = await jwt.sign(
            { user: selectResult.rows[0] },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
          );
          return res.status(200).json({
            self: req.path,
            user: {
              facebookId: selectResult.rows[0].facebook_id,
              name: selectResult.rows[0].name,
              profilePicture: selectResult.rows[0].profile_picture,
              email: selectResult.rows[0].email
            },
            jwt: token
          });
        }
      } else {
        return res.status(403).json({
          error: {
            message:
              "Invalid User Id !! User is not assigned to the given access token!!"
          }
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ...error, message: error.message });
    }
  },
  // TODO: verifyJwtToken and validate JwtToken has shared logic, breaks DRY 
  // acts as a middleware to validate token and redirect request to the next middleware in request pipleline
  verifyJwtToken: async (req, res, next) => {
    console.log('verfiy token route exists here');
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
      const headerArr = authHeader.split(" ");
      const jwtToken = headerArr[1];
      // verify the jwt token received in header
      try {
        const decodedUserData = await jwt.verify(
          jwtToken,
          process.env.JWT_SECRET
        );
        // add facebook_id  obtained from decoded jwt data to the req object which will be used by the next() i.e. contacts controllers
        req.facebookId = decodedUserData.user["facebook_id"];
        next();
      } catch (error) {
        return res
          .status(403)
          .send({ error: { message: "Invalid or Expired JWT Token!!" } });
      }
    } else {
      return res
        .status(403)
        .send({
          error: { message: "No Authorization headers found in request!!" }
        });
    }
  },
  // endpoint to vlaidate jwt token exposed to client, return 200 on successful validation
  validateJwtToken: async (req, res, next) => {
    console.log('verfiy token route exists here');
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
      const headerArr = authHeader.split(" ");
      const jwtToken = headerArr[1];
      // verify the jwt token received in header
      try {
        const decodedUserData = await jwt.verify(
          jwtToken,
          process.env.JWT_SECRET
        );
        // add facebook_id  obtained from decoded jwt data to the req object which will be used by the next() i.e. contacts controllers
        //req.facebookId = decodedUserData.user["facebook_id"];
        //next();
        
        return res.status(200).json({user:{
          facebookId: decodedUserData.user["facebook_id"],
          name: decodedUserData.user.name,
          profilePicture: decodedUserData.user["profile_picture"],
          email: decodedUserData.user.email
        }});
      } catch (error) {
        return res
          .status(403)
          .send({ error: { message: "Invalid or Expired JWT Token!!" } });
      }
    } else {
      return res
        .status(403)
        .send({
          error: { message: "No Authorization headers found in request!!" }
        });
    }
  }
};
module.exports = authController;
