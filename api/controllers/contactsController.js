//TODO: REMOVE contacts list
const { pool } = require("../DAL/dbConfig");
const contactsResponseMaker = require("../helpers/responseMaker");

let contactsController = {
  getAllContacts: async (req, res, next) => {
    try {
      const result = await pool.query(`SELECT * FROM contacts;`);
      res.status(200).json(contactsResponseMaker.success(req, result.rows));
    } catch (error) {
      res.status(500).json(contactsResponseMaker.error(req, error));
    }
  },
  getContactById: async (req, res, next) => {
    try {
      const parsedId = parseInt(req.params.id);
      //NOTE: parseInt parses "1dbd" as 1 so use regex check instead to make sure the id path param is numeric
        // if(isNaN(parsedId)) return res.status(400).json(contactsResponseMaker.error(req, {message:  `no contacts exists for ${req.params.id}`}));
      if (!new RegExp("^[0-9]+$").test(req.params.id))
        return res.status(400).json(
          contactsResponseMaker.error(req, {
            message: `Invalid path params`
          })
        );

      const selectQuery = {
        text: `SELECT * FROM contacts where id=$1`,
        values: [parsedId]
      };
      const result = await pool.query(selectQuery);
      if (result.rows.length === 0)
        return res.status(404).json(
          contactsResponseMaker.error(req, {
            message: `Contact with id ${parsedId} doesn't exist.`
          })
        );
      res.status(200).json(contactsResponseMaker.success(req, result.rows));
    } catch (error) {
      res.status(500).json(contactsResponseMaker.error(req, error));
    }
  },
  createContact: async (req, res, next) => {
    console.log(JSON.stringify(req.body));
    try {
      // NOTE: BUG TODO: !req.body.phoneNumber would consider 0 as empty as well
      if (!req.body.firstName || !req.body.phoneNumber)
        return res.status(400).json(
          contactsResponseMaker.error(req, {
            message:
              "Invalid Request!! firstName and phoneNumber should be present in the request body."
          })
        );

      if (!new RegExp("^[0-9]+$").test(req.body.phoneNumber))
        return res.status(400).json(
          contactsResponseMaker.error(req, {
            message:
              "Invalid Request!! Phone number should only contain numbers."
          })
        );

      const newContact = {
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        company: req.body.company || "",
        email: req.body.email || "",
        phoneNumber: req.body.phoneNumber,
        address: req.body.address || "",
        birthday: req.body.birthday || null
      };
      //console.log(newContact);
      //const parsedBirthday = newContact.birthday === null ? null :  `'${newContact.birthday}'`
      //console.log(parsedBirthday);

      //let insertScript = `INSERT INTO contacts (first_name,last_name,phone_number,company,email,address,birthday) VALUES ('${newContact.firstName}', '${newContact.lastName}', '${newContact.phoneNumber}', '${newContact.company}', '${newContact.email}', '${newContact.address}', ${parsedBirthday}) RETURNING *;`;

      const insertQuery = {
        text:
          "INSERT INTO contacts (first_name,last_name,phone_number,company,email,address,birthday) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        values: [
          newContact.firstName.trim(),
          newContact.lastName.trim(),
          newContact.phoneNumber,
          newContact.company.trim(),
          newContact.email.trim(),
          newContact.address.trim(),
          newContact.birthday
        ]
      };

      const result = await pool.query(insertQuery);
      console.log(result.rows);
      res.status(201).json(contactsResponseMaker.success(req, result.rows));
    } catch (error) {
      res.status(500).json(contactsResponseMaker.error(req, error));
    }
  },
  deleteContact: async (req, res, next) => {
    try {
      if (!new RegExp("^[0-9]+$").test(req.params.id)) {
        return res.status(400).json(
          contactsResponseMaker.error(req, {
            message: `Invalid path params`
          })
        );
      }

      const parsedId = parseInt(req.params.id);

      const selectQuery = {
        text: `SELECT * FROM contacts where id=$1`,
        values: [parsedId]
      };
      const selectResult = await pool.query(selectQuery);
      if (selectResult.rows.length === 0) {
        return res.status(404).json(
          contactsResponseMaker.error(req, {
            message: `Deletion Failed!! Contact with id ${parsedId} doesn't exist.`
          })
        );
      }

      const deleteQuery = {
        text: `DELETE FROM contacts where id = $1`,
        values: [parsedId]
      };
      const deleteResult = await pool.query(deleteQuery);
      res
        .status(200)
        .json(contactsResponseMaker.success(req, deleteResult.rows));
    } catch (error) {
      res.status(500).json(contactsResponseMaker.error(req, error));
    }
  },
  updateContact: async function(req, res, next) {
    try {
      if (!new RegExp("^[0-9]+$").test(req.params.id)) {
        return res.status(400).json(
          contactsResponseMaker.error(req, {
            message: `Invalid path params`
          })
        );
      }

      const parsedId = parseInt(req.params.id);

      const selectQuery = {
        text: `SELECT * FROM contacts where id=$1`,
        values: [parsedId]
      };
      const selectResult = await pool.query(selectQuery);
      if (selectResult.rows.length === 0) {
        return res.status(404).json(
          contactsResponseMaker.error(req, {
            message: `Update Failed!! Contact with id ${parsedId} doesn't exist.`
          })
        );
      }

      const updatedContact = {
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        company: req.body.company || "",
        email: req.body.email || "",
        phoneNumber: req.body.phoneNumber,
        address: req.body.address || "",
        birthday: req.body.birthday || null
      };

      const updateQuery = {
        text:
          "UPDATE contacts set first_name = $1, last_name = $2, phone_number = $3, company = $4, email = $5, address = $6, birthday = $7 where id = $8 RETURNING *",
        values: [
          updatedContact.firstName.trim(),
          updatedContact.lastName.trim(),
          updatedContact.phoneNumber,
          updatedContact.company.trim(),
          updatedContact.email.trim(),
          updatedContact.address.trim(),
          updatedContact.birthday,
          parsedId
        ]
      };

      const updateResult = await pool.query(updateQuery);
      res
        .status(200)
        .json(contactsResponseMaker.success(req, updateResult.rows));
    } catch (error) {
      res.status(500).json(contactsResponseMaker.error(req, error));
    }
  }
};

module.exports = contactsController;
