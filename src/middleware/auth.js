const adminAuth = (req,res, next)=>{
    const token = 'xyz';
    const isAdminAuth = token === 'xyz';
    if (!isAdminAuth) {
        res.status(401).send("Unauthorized Access")
    }else{
        next();
    }
}

const userAuth = (req,res, next)=>{
    const token = 'xyz';
    const isUserAuth = token === 'xyz';
    if (!isUserAuth) {
        res.status(401).send("Unauthorized Access")
    }else{
        next();
    }
}

module.exports = {adminAuth, userAuth}