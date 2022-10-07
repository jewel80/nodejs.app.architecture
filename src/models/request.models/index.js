const validate = require("./user.request.model");

console.log('=======req===============')
console.log(validate)
console.log('==========end req h============')

const validators = { userSchemaValidate: validate };
module.exports = validators;   // export default validators; es-6
 
