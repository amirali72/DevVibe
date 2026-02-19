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

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    if (req.body?.firstName && req.body.firstName.length < 3) {
        throw new Error("Firstname must be at least 3 characters");
    }
    if (req.body?.lastName?.length < 3) {
        throw new Error("Lastname must be at least 3 characters");
    };

    if (!validator.isEmail(req?.body?.emailId)) {
        throw new Error("Invalid email address");
    }


    return isEditAllowed;
}

module.exports = { validateSignup, validateEditProfileData }