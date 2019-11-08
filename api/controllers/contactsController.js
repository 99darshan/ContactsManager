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

let contactsController = {
    getAllContacts:  function(req, res,next){
        
        res.status(200).json(contacts);
    },

    getContactById: function(req, res,next){
        const parsedId = parseInt(req.params.id); 
        const contact = contacts.find(c => c.id === parsedId );
        if(!contact) return res.status(404).json({message: `Contact with id ${parsedId} doesn't exists`});
    res.status(200).json(contact);
    },
    
    createContact: function(req,res,next){
        const newContact = {
            id: contacts.length+1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            company: req.body.company,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }
        contacts.push(newContact);
         
        if(!newContact) return res.status(404).json({message: 'error creating new contact'});
        res.status(201).json(newContact);
    },
    deleteContact: function(req,res,next){},
    updateContact: function(req,res,next){}

};

module.exports = contactsController;