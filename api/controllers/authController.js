const dotEnv = require("dotenv");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { pool } = require("../configs/dbConfig");

dotEnv.config();
let authController = {
  facebookLogin: async (req, res, next) => {
    // TODO: respond error if no access token or userid in request body
    const accessToken = req.body.accessToken;
    const userId = req.body.userId;

    if (!accessToken || !userId) {
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
        `https://graph.facebook.com/${userId}?fields=name,email,picture&access_token=${accessToken}`
      );
      let userRes = await userResponse.json();
      // validate if the userId from response of facebook graph api server is same as the userId passed in the request
      if (userId === userRes.id) {
        // check if the user exists in our database
        const selectQuery = {
          text: `SELECT * FROM users where facebook_id=$1`,
          values: [userRes.id]
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
              userRes.id,
              userRes.name || "",
              userRes.email || "",
              userRes.picture.data.url || ""
            ]
          };
          const createResult = await pool.query(insertQuery);
          console.log(createResult.rows);
          // TODO: expirty of token
          let token = await jwt.sign(
            { user: createResult.rows[0] },
            process.env.JWT_SECRET
          );
          return res.status(201).json({
            self: req.path,
            user: createResult.rows[0],
            jwt: token
          });
        } else {
          console.log("...existing");
          // return existing user if rows are returned by select query
          // first row gives the user
          let token = await jwt.sign(
            { user: selectResult.rows[0] },
            process.env.JWT_SECRET
          );
          return res.status(200).json({
            self: req.path,
            user: selectResult.rows[0],
            jwt: token
          });
        }
      } else {
        return res
          .status(403)
          .json({
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
  }
};
module.exports = authController;
