//TODO: REMOVE contacts list
const {pool} = require('../DAL/dbConfig');
const contactsResponseMaker = require('../helpers/responseMaker');



let contactsController = {
    getAllContacts: async (req, res,next)=>{
        try {
            const result = await pool.query(`SELECT * FROM contacts;`);
            res.status(200).json(contactsResponseMaker.OK(req, result.rows));
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error);
        }
    },
    getContactById: async (req, res,next) => {
        try{
            const parsedId = parseInt(req.params.id);
            const result = await pool.query(`SELECT * FROM contacts where id=${parsedId}`);
            if(result.rows.length === 0) return res.status(404).json({message: `Contact with id ${parsedId} doesn't exist.`});
            console.log(result.rows);
            res.status(200).json(result.rows);
        }catch(error){
            res.status(500).json(error);
        }
    },    
    createContact: async (req,res,next) => {
        //TODO: validate and sanitize input request body to handle sql injection
        // TODO: make sure app doesn't crash when client sends an unformatted JSON or an empty JSON in the request body, 
        // TODO: make sure undefined values are not being inserted as undefined string into database
        // TODO: send the link to newly created resource in response header?? and send error when required data are not received
        
        console.log(JSON.stringify(req.body));
        try {
            const newContact = {
                firstName: req.body.firstName || '',
                lastName: req.body.lastName || '',
                company: req.body.company || '',
                email: req.body.email || '',
                phoneNumber: req.body.phoneNumber,
                address: req.body.address || '',
                birthday: req.body.birthday || null
            };
            console.log(newContact);
            const parsedBirthday = newContact.birthday === null ? null :  `'${newContact.birthday}'`
            console.log(parsedBirthday);

            let insertScript = `INSERT INTO contacts (first_name,last_name,phone_number,company,email,address,birthday) VALUES ('${newContact.firstName}', '${newContact.lastName}', '${newContact.phoneNumber}', '${newContact.company}', '${newContact.email}', '${newContact.address}', ${parsedBirthday}) RETURNING *;`;

            console.log(insertScript);
            
            const result = await pool.query(insertScript);
            //console.table(result);
            console.log(result.rows);
            //if(result.rows.length === 0) return res.stat TODO:
            res.status(201).json(contactsResponseMaker.OK(req, result.rows));

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteContact: async(req,res,next)=>{
        try{
            // TODO: return 200 if the resource to be deleted doesn't exist??
            console.log('delete called');
            const parsedId = parseInt(req.params.id);
            const result = await pool.query(`Delete FROM contacts where id=${parsedId}`);
            res.sendStatus(200);
        }catch(error){
            res.status(500).json(error);
        }
    },
    updateContact: function(req,res,next){}

};

module.exports = contactsController;