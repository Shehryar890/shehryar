const csrf = require("csurf")




const csrfProtection = csrf({
    cookie:{
        httpOnly :false,
        secure: process.env.Dev==="production",
        sameSite : "strict",

    }


})


module.exports = {
    csrfProtection
}