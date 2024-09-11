const Accounts = require("../models/account");
const axios = require('axios');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.signup_post = (req,res) => {
    const plainPassword = req.body.Password;
    bcrypt.hash(plainPassword , saltRounds, function(err, hash) {

        if(err)
        {
            console.log(err);
            res.sendStatus(400).send("Error in Hashing ");
        }

        const newUser = new Accounts(
            {
                Email : req.body.Email,
                Password : hash,
            }
        )
    
        newUser.save()
        .then((msg)=>{
            res.json(JSON.stringify({Email : newUser.Email , _id : newUser._id}));
        })
        .catch((err)=>{console.log(err); res.sendStatus(400)})
    });


}

module.exports.login_post = async (req, res) => {
    const userEmail = req.body.Email;
    const userPlainPassword = req.body.Password;

    try {
        const user = await Accounts.findOne({ Email: userEmail });
        if (!user) 
        {
            return res.status(400).json({ message: "User Not Found" });
        }
        const result = await bcrypt.compare(userPlainPassword, user.Password);
        
        if (result) 
        {
            return res.json({ Email: user.Email, _id: user._id });
        }
        else
        {
            return res.status(400).json({ message: "Incorrect Email/Password" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.logout_post = (req,res) => {
    console.log("logout");
    res.send("Logout");
}
