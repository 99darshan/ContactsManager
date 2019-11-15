/**
 * creates success and error response for contacts resource using HATEOS ION spec
 * converts snake_cases to camelCases
 */
const contactsResponseMaker = {
  success: (req, results) => {
    let responseJson = {
      self: req.path,
      values: results.map(item => ({
        self: `${req.path}/${item.id}`,
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
  },
  error: (req, error) => {
      let responseJson = {
          self: req.path,
          error: {
              ...error,
              message: error.message
          }
      }
      return Object.freeze(responseJson);
  }
};

module.exports = contactsResponseMaker;
