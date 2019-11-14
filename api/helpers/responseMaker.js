/**
 * creates response for contacts resource using HATEOS ION spec
 * converts snake_cases to camelCases
 */
const contactsResponseMaker = {
    OK: (req, results) => {
        let responseJson = {
            href: req.path,
            values: results.map(item => ({
              id: item.id,
              firstName: item.first_name || "",
              lastName: item.last_name || "",
              phoneNumber: item.phone_number || "",
              company: item.company || "",
              email: item.email || "",
              address: item.address || "",
              birthday: item.birthday || ""
            }))
          };
          return Object.freeze(responseJson);
    }
}

module.exports = contactsResponseMaker;