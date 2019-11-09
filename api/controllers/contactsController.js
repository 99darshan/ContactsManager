var contacts = [{
    id: 1,
    firstName:'super',
    lastName: 'man',
    company: 'Milky way',
    email: 'abc@email.com',
    phoneNumber:9845214556,
    address: "123 street mars"
}, {
    id: 2,
    firstName:'pluto',
    lastName: 'kumar',
    company: 'supernova',
    email: 'abc@email.com',
    phoneNumber:9845214556,
    address: "123 street mars"
},{
    id: 3,
    firstName:'ninja',
    lastName: 'hataudi',
    company: 'Nick',
    email: 'abc@email.com',
    phoneNumber:9845214556,
    address: "123 street mars"
}, {
    id: 3,
    firstName:'moon',
    lastName: 'dude',
    company: 'Pizza Factory',
    email: 'abc@email.com',
    phoneNumber:9845214556,
    address: "123 street mars"
}, ];

const {pool} = require('../DAL/dbConfig');

let contactsController = {
    getAllContacts: async (req, res,next)=>{
        try {
            const result = await pool.query(`SELECT * FROM contacts;`);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getContactById: async (req, res,next) => {
        try{
            const parsedId = parseInt(req.params.id);
            const result = await pool.query(`SELECT * FROM contacts where id=${parsedId}`);
            if(result.rows.length === 0) return res.status(404).json({message: `Contact with id ${parsedId} doesn't exist.`});
            res.status(200).json(result.rows);
        }catch(error){
            res.status(500).json(error);
        }
    },    
    createContact: async (req,res,next) => {
        //TODO: validate and sanitize input request body to handle sql injection
        // TODO: make sure app doesn't crash when client sends an unformatted JSON or an empty JSON in the request body, 
        // TODO: make sure undefined values are not being inserted as undefined string into database
        // TODO: send the link to newly created resource in response header??
        
        console.log(JSON.stringify(req.body));
        try {
            const newContact = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                company: req.body.company,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            };

            let insertScript = `INSERT INTO contacts (firstname,lastname,phonenumber,company,email,address) VALUES ('${newContact.firstName}', '${newContact.lastName}', '${newContact.phoneNumber}', '${newContact.company}', '${newContact.email}', '${newContact.address}');`;

            console.log(insertScript);
            // TODO: validate and sanitize the req.body inputs, handle sql injection
            const result = await pool.query(insertScript);
            //if(result.rows.length === 0) return res.stat TODO:
            res.status(201).json(result.rows);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteContact: async(req,res,next)=>{
        try{
            console.log('delete called');
            const parsedId = parseInt(req.params.id);
            const result = await pool.query(`Delete FROM contacts where id=${parsedId}`);
            res.status(200);
        }catch(error){
            res.status(500).json(error);
        }
    },
    updateContact: function(req,res,next){}

};

module.exports = contactsController;