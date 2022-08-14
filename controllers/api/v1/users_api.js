//this will be like users controller


const user = require('../../../models/user');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const env = require('../../../config/environment')


module.exports.createSession = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    try {

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: "Sing in successfully , here is your token , please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '100000' })   //jwt.sign() -- is the defined function && user.toJSON() its converts users to json
            }
        })

    } catch (err) {
        console.log('******', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

}