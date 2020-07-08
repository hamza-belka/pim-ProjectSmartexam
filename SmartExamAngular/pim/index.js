var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var uuid = require('uuid');

//Connect to MySQL
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pim',
    port: 3306

});

//Create RESTFUL
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//PASSWORD UTIL
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') //convert to hexa format
        .slice(0, length);
};

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); //Use SHA512
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userPassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}


function checkHashPassword(userPassword, salt) {
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}


app.post('/verif', (req, res, next) => {


    var post_data = req.body;
    var email = post_data.email;
    con.query('Select * From enseignant where email=?', [email], function (err, result, fields) {
        con.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
        if (result && result.length)
            res.json('User already exists!!!');
        else
            res.json('User safe');

    });
});


app.post('/register', (req, res, next) => {
    var post_data = req.body;
    var uid = uuid.v4();
    var plaint_password = post_data.password;
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt;
    var name = post_data.name;
    var email = post_data.email;
    var numtel = post_data.numtel;
    var adresse = post_data.adresse;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(salt);
    console.log(numtel);
    console.log(adresse);

     con.query('Select * From enseignant where email=?', [email], function (err, result, fields) {
        con.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
        if (result && result.length)
            res.json('User already exists!!!');
        else {
            console.log("imaaaaaaaaaaggggggeee");

        con.query('INSERT INTO enseignant (name, email, encrypted_password, salt, adresse, numtel) VALUES (?,?,?,?,?,?)',
                [name, email, password, salt, adresse, numtel], function (err, result, fields) {
                    con.on('error', function (err) {
                        console.log('[MySQL ERROR]', err);
                        res.json('Register error: ', err);
                    });
                    res.json('Register successful');

                })
        }
    });

});


//login************
app.post('/login', (req, res, next) => {
    var post_data = req.body;
    var user_password = post_data.password;
    var email = post_data.email;

    console.log('email', email);
    console.log('emaillllllllllllllllll');

    con.query('Select * From enseignant where email=?', [email], function (err, result, fields) {
        con.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
        if (result && result.length) {
            var salt = result[0].salt;
            var encrypted_password = result[0].encrypted_password;
            var hashed_password = checkHashPassword(user_password, salt).passwordHash;
            if (encrypted_password == hashed_password)
                res.end(JSON.stringify(result[0]));
            else
                res.end(JSON.stringify('Wrong Password'));
        }
        else {
            res.json('User not exists!!!');
        }
    });

});



// running on port
app.listen(2000, () => {
    console.log('EDMTDev Search API running on port 3000');
})
