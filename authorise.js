const jwt = require("jsonwebtoken");

function authorize (req, res, next) {
    const token = req.headers['authorization'];
    
        if (!token) {
        return res.status(403).json({message:" Authorization Denied"});
    }
    const splitToken = token.split(' ')[1]
    console.log(splitToken);

    jwt.verify(splitToken, 'tejas', (err, decoded) => {
        if(err) {
            return res.status(401).send({message: "Token is not valid"});
        }
        req.userId = decoded._id;
        next();
    });
}

module.exports = authorize;