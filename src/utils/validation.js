const validator = require("validator");

const validateSignup = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not correct");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address: ")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please add a strong password");
    }

}

module.exports = {validateSignup}