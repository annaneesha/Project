const express = require("express");
const cors = require("cors");
const mysql = require('mysql');

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'data'
});

con.connect(function (err) {
    if (err) {
        console.log("Error Connection DB")
    }
    console.log("Connection With DB Sucess");
});

server.post("/login", (request, response) => {
    const { username, password } = request.body;
    let query = "SELECT name, email, password, userId FROM user WHERE email = '" + username + "' AND password = '" + password + "'"
    con.query(query, (err, result) => {
        if (err) {
            response.json({
                status: 404,
                message: "login failed"
            });
        }
        if (result.length > 0) {
            response.json({
                userId: result[0].userId,
                status: 200,
                message: "logged in successfully"
            });
        } else {
            response.json({
                status: 404,
                message: "login failed"
            });
        }
    });

});

server.post("/updateFavList", (request, response) => {
    const { userId, productDetailId } = request.body;
    let query = `select * from favourite_list where user_id = ` + userId + ` and product_desc_id = ` + productDetailId;
    console.log(query, 'query');
    con.query(query, (err, result) => {
        console.log(result, 'result');
        if (result && result.length > 0) {
            response.json({
                status: 200,
                message: "Already added to favourite list"
            });
        } else {
            let queryA = `INSERT INTO favourite_list (user_id, product_desc_id) VALUES('${userId}', '${productDetailId}')`
            con.query(queryA, (err, result) => {
                console.log(result, 'result result')
                if (result.insertId > 0) {
                    response.json({
                        status: 200,
                        message: "Successfully added to favourite list"
                    });
                }
            });
        }
    });
});

server.post("/register", (request, response) => {
    const { username, password, age, phonenumber, email } = request.body;
    let query = `INSERT INTO user (name, password, age, phonenumber, email) VALUES('${username}', '${password}','${age}', '${phonenumber}','${email}')`
    con.query(query, (err, result) => {
        if (err) {
        }
        if (result.insertId > 0) {
            response.json({
                status: 200,
                message: "registered successfully"
            });
        } else {
            response.json({
                status: 404,
                message: "registration failed"
            });
        }
    });
});

server.post("/findnUserName", (request, response) => {
    const { userId } = request.body;
    let query = "SELECT name FROM user WHERE userId =" + userId
    if (!userId) {
        return response.redirect('/login');
    } else {
        con.query(query, (err, result) => {
            if (result.length > 0) {
                response.json({
                    result: result,
                    status: 200,
                    message: "logged in successfully"
                });
            }
        });
    }
});

server.get("/findProducts", (request, response) => {
    let query = "SELECT * FROM products"
    con.query(query, (err, result) => {
        if (result.length > 0) {
            response.json({
                result: result,
                status: 200,
                message: "logged in successfully"
            });
        }
    });
});

server.post("/getUserDetail", (request, response) => {
    const { userId } = request.body;
    let query = "SELECT * FROM user where userId =" + userId
    con.query(query, (err, result) => {
        if (result.length > 0) {
            response.json({
                result: result,
                status: 200,
                message: "logged in successfully"
            });
        }
    });
});

server.post("/edituser", (request, response) => {
    const { userId, username, password, age, phonenumber, email } = request.body;
    let query = `UPDATE user SET name='${username}', password='${password}', age='${age}' , phonenumber='${phonenumber}',
     email='${email}' WHERE userId= '${userId}'`
    con.query(query, (err, result) => {
        if (err) {
        }
        if (result.insertId > 0) {
            response.json({
                status: 200,
                message: "Updated successfully"
            });
        } else {
            response.json({
                status: 404,
                message: "Updated failed"
            });
        }
    });
});

server.post("/findProductDetail", (request, response) => {
    const { productId, searchItem } = request.body;
    let query = "SELECT * FROM product_description where product_id =" + productId + " AND name like '" + searchItem + "%'"
    con.query(query, (err, result) => {
        if (result.length > 0) {
            response.json({
                result: result,
                status: 200,
                message: "product detail fetched successfully"
            });
        }
    });
});

server.post("/favouritelist", (request, response) => {
    const { userId } = request.body;
    let query = "SELECT * from product_description p INNER JOIN favourite_list f on f.product_desc_id = p.product_desc_id WHERE f.user_id = " + userId
    con.query(query, (err, result) => {
        if (result && result.length > 0) {
            response.json({
                result: result,
                status: 200,
                message: "favourite details fetched successfully"
            });
        }
    });
});

server.listen(5000, () => {
    console.log("Server is running");
});

