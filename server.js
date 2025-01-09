const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bharath",
    database: "scoreDB"
});

db.connect((err) => {
    if(err)
        console.log("Database connection unsuccessful, Error:", err);
    else
        console.log("Database connected successfully");
})
app.use(express.static("public"));

app.get('/',(req, res) => {
    // res.sendFile(path.join(__dirname,'public/signup','signup.html'));
    res.redirect('signup/signup.html');
});

app.post("/signup", async (req, res) => {

    let {username, email, password} = req.body;
    // console.log(username, email, password);
    let type = "user";
    let query = `INSERT INTO users VALUES(?, ?, ?, ?)`;

    db.query(query, [username, email, password, type], (err, result) => {
        if(err)
        {
            res.status(500).json({success:false, message:err.message});
            return;
        }
        else
            res.status(201).json({success:true, message: "Signup successful"}); // , type:user.type
    });
});

app.post("/login", async (req, res) => {

    let {email, password} = req.body;
    // console.log(req.body);
    let query = "SELECT * FROM users WHERE email=?";

    db.query(query, [email], (err, result) => {
        if(err)
        {
            res.status(500).json({success: false, message: err.message});
            return;
        }
        // console.log("result: ",result);

        if(result.length === 0)
        {
            res.status(401).json({success:false, message:"User not found"});
            return;
        }
        var user = result[0];
        
        // console.log("user ", user, "resultb ", result);
        if(user.password != password)
        {
            res.status(404).json({success:false, message:"Invalid credentials"});
            return;
        }

        res.status(200).json({success:true, message: "Login successful"}); // , type:user.type

    });
});

/* sets */

app.post('/sets', async (req,res) => {
    let {winner, scoreA, scoreB} = req.body;
    // console.log(req.body);
    let query = "INSERT INTO sets(winner, scoreA, scoreB) VALUES(?,?,?)";

    db.query(query, [winner, scoreA, scoreB], (err, result) => {
        if(err){
            // console.log(err);
            res.status(500).json({success: false, message:"Post operation failure"});
        }
        else
            res.status(201).json({success: true, message: "Post operation successful"});
    });
});

app.get('/sets', async (req, res) => {
    let query = 'SELECT * FROM sets';
    db.query(query, (err, result) => {
        if(err)
            res.status(500).json({success:false, message:"Get operation failure"});
        else {
            // console.log(result);
            res.status(200).send(result);
        }
    });
});

/* players */
app.post('/players', async (req, res) => {
    let {team, jno, player, score} = req.body;
    // console.log(req.body);
    let query = "INSERT INTO players VALUES(?,?,?,?)";

    db.query(query, [team, jno, player, score], (err, result) => {
        if(err)
            res.status(500).json({success: false, message: "Post operation failure"});
        else
            res.status(201).json({success: true, message: "Post operation successful"});
    });
});

app.get('/players', async (req, res) => {
    let query = `SELECT * FROM players`;
    // console.log(req.params.team, req.team, team);

    db.query(query, (err, result) => {
        if(err)
            res.status(500).json({success: false, message: "Get opertaion failure"});
        else {
            // console.log(result);
            res.status(200).send(result);
            // res.status(200).json({success: true, message: "Get operation successful"});
        }
    });
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});