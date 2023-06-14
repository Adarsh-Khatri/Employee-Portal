let express = require("express");
let mysql = require('mysql');
require('dotenv').config();
let cors = require('cors');
const PORT = process.env.PORT || 2410;

// let connectData = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'testdb-7',
// }

let app = express();
app.use(express.json());
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
    res.header("Access-Control-Allo-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.listen(PORT, () => console.log(`Listening on port http://localhost/${PORT}`))


// // @ GET 
// // @ ROUTE : /svr/employees AND QUERY PARAMS ARE { department, designation, gender }
// app.get('/svr/employees', (req, res) => {
//     let { department, designation, gender } = req.query;
//     let connection = mysql.createConnection(connectData);
//     let sql = "SELECT * FROM EMPLOYEES";
//     connection.query(sql, (err, data) => {
//         if (err) return res.status(404).json(err);
//         else {
//             data = department ? data.filter(dt => dt.department === department) : data;
//             data = designation ? data.filter(dt => dt.designation === designation) : data;
//             data = gender ? data.filter(dt => dt.gender === gender) : data;
//             return res.status(200).json(data)
//         }
//     })
// })


// // @ GET 
// // @ ROUTE : /svr/employees/department/:dept
// app.get('/svr/employees/department/:dept', (req, res) => {
//     let { dept } = req.params;
//     let connection = mysql.createConnection(connectData);
//     let sql = "SELECT * FROM EMPLOYEES WHERE DEPARTMENT = ?";
//     connection.query(sql, dept, (err, data) => {
//         if (err) return res.status(404).json(err);
//         else return res.status(200).json(data)
//     })
// })


// // @ GET 
// // @ ROUTE : /svr/employees/department/:designation
// app.get('/svr/employees/designation/:designation', (req, res) => {
//     let { designation } = req.params;
//     let connection = mysql.createConnection(connectData);
//     let sql = "SELECT * FROM EMPLOYEES WHERE DESIGNATION = ?";
//     connection.query(sql, designation, (err, data) => {
//         if (err) return res.status(404).json(err);
//         else return res.status(200).json(data)
//     })
// })


// // @ GET 
// // @ ROUTE : /svr/employees/gender/:gender
// app.get('/svr/employees/gender/:gender', (req, res) => {
//     let { gender } = req.params;
//     let connection = mysql.createConnection(connectData);
//     let sql = "SELECT * FROM EMPLOYEES WHERE GENDER = ?";
//     connection.query(sql, gender, (err, data) => {
//         if (err) return res.status(404).json(err);
//         else return res.status(200).json(data)
//     })
// })


// // @ GET 
// // @ ROUTE : /svr/employees/:id
// app.get('/svr/employees/:id', (req, res) => {
//     let { id } = req.params;
//     let connection = mysql.createConnection(connectData);
//     let sql = "SELECT * FROM EMPLOYEES WHERE EMPCODE = ?";
//     connection.query(sql, id, (err, data) => {
//         if (err) return res.status(404).json(err);
//         else return res.status(200).json(data)
//     })
// })


// // @ DELETE 
// // @ ROUTE : /svr/employees/:id
// app.delete('/svr/employees/:id', (req, res) => {
//     let { id } = req.params;
//     let connection = mysql.createConnection(connectData);
//     let sql = "DELETE FROM EMPLOYEES WHERE EMPCODE = ?";
//     connection.query(sql, id, (err) => {
//         if (err) return res.status(404).json(err);
//         else return res.status(200).json({ message: `Employee ${id} Deleted Successfully` })
//     })
// })


// // @ POST
// // @ ROUTE : /svr/employees
// app.post('/svr/employees', (req, res) => {
//     let body = req.body;
//     let connection = mysql.createConnection(connectData);
//     let sql = "INSERT INTO EMPLOYEES(EMPCODE, NAME, DEPARTMENT, DESIGNATION, SALARY, GENDER) VALUES(?,?,?,?,?,?)";
//     connection.query(sql, [body.empCode, body.name, body.department, body.designation, body.salary, body.gender], (err) => {
//         if (err) return res.status(404).json(err);
//         else return res.status(200).json(body)
//     })
// })


// // @ PUT
// // @ ROUTE : /svr/employees/:id
// app.put('/svr/employees/:id', (req, res) => {
//     let { id } = req.params;
//     let body = req.body;
//     console.log(body);
//     let connection = mysql.createConnection(connectData);
//     let sql = "UPDATE EMPLOYEES SET EMPCODE = ?,NAME = ?,DEPARTMENT = ?,DESIGNATION = ?,SALARY = ?,GENDER = ? WHERE EMPCODE = ?";
//     connection.query(sql, [body.empCode, body.name, body.department, body.designation, body.salary, body.gender, id], (err, data) => {
//         if (err) return res.status(404).json(err);
//         else {
//             console.log(body);
//             return res.status(200).json(body)
//         }
//     })
// })



// let employeesData = [
//     { empCode: 1451, name: "Jack", department: "Finance", designation: "Manager", salary: 52500, gender: "Male" },
//     { empCode: 1029, name: "Steve", department: "Technology", designation: "Manager", salary: 71000, gender: "Male" },
//     { empCode: 1891, name: "Anna", department: "HR", designation: "Manager", salary: 55100, gender: "Female" },
//     { empCode: 1322, name: "Kathy", department: "Operations", designation: "Manager", salary: 49200, gender: "Female" },
//     { empCode: 1367, name: "Bob", department: "Marketing", designation: "Manager", salary: 39000, gender: "Male" },
//     { empCode: 1561, name: "George", department: "Finance", designation: "Trainee", salary: 22500, gender: "Male" },
//     { empCode: 1777, name: "Harry", department: "Technology", designation: "Trainee", salary: 31000, gender: "Male" },
//     { empCode: 1606, name: "Julia", department: "HR", designation: "Manager", salary: 25100, gender: "Female" },
//     { empCode: 1509, name: "Kristina", department: "Operations", designation: "Trainee", salary: 19200, gender: "Female" },
//     { empCode: 1533, name: "William", department: "Marketing", designation: "Trainee", salary: 16200, gender: "Male" },
//     { empCode: 1161, name: "Stephen", department: "Finance", designation: "VP", salary: 82500, gender: "Male" },
//     { empCode: 1377, name: "Winston", department: "Technology", designation: "VP", salary: 91000, gender: "Male" },
//     { empCode: 1206, name: "Victoria", department: "HR", designation: "Manager", salary: 65100, gender: "Female" },
//     { empCode: 1809, name: "Pamela", department: "Operations", designation: "VP", salary: 78600, gender: "Female" },
//     { empCode: 1033, name: "Tim", department: "Marketing", designation: "VP", salary: 66800, gender: "Male" },
//     { empCode: 1787, name: "Peter", department: "Technology", designation: "Manager", salary: 47400, gender: "Male" },
//     { empCode: 1276, name: "Barbara", department: "Technology", designation: "Trainee", salary: 21800, gender: "Female" },
//     { empCode: 1859, name: "Donna", department: "Operations", designation: "Trainee", salary: 21900, gender: "Female" },
//     { empCode: 1874, name: "Igor", department: "Operations", designation: "Manager", salary: 48300, gender: "Male" },
// ]


// app.get('/svr/resetData', (req, res) => {
//     let connection = mysql.createConnection(connectData);
//     let sql = "DELETE FROM EMPLOYEES";
//     connection.query(sql, (err) => {
//         if (err) console.log('ERROR: ', err);
//         else {
//             let employeeArr = employeesData.map(employee => [employee.empCode, employee.name, employee.department, employee.designation, employee.salary, employee.gender])
//             let sql2 = 'INSERT INTO EMPLOYEES(empCode, name, department, designation, salary, gender) VALUES ?';
//             connection.query(sql2, [employeeArr], (err) => {
//                 if (err) console.log('ERROR: ', err);
//                 else {
//                     return res.status(200).json({ message: "DATA RESET SUCCESSFULLY" })
//                 }
//             })
//         }
//     })
// })



const { Client } = require("pg")
const client = new Client({
    user: "postgres",
    password: "virgoPostgres001",
    port: 5432,
    host: "db.iltljszlsaempjnlkbmh.supabase.co",
    ssl: { rejectUnauthorized: false }
});
client.connect((res, err) => console.log('CONNECTED!!!'))



// @ GET 
// @ ROUTE : /svr/employees AND QUERY PARAMS ARE { department, designation, gender }
app.get('/svr/employees', (req, res) => {
    let { department, designation, gender } = req.query;
    const sql = "SELECT * FROM EMPLOYEES";
    client.query(sql, (err, result) => {
        if (err) res.status(400).json('ERROR : ', err.message);
        else {
            let data = result.rows;
            data = department ? data.filter(dt => dt.department === department) : data;
            data = designation ? data.filter(dt => dt.designation === designation) : data;
            data = gender ? data.filter(dt => dt.gender === gender) : data;
            return res.status(200).json(data)
        }
        client.end();
    })
})


// // @ POST
// // @ ROUTE : /svr/employees
app.post('/svr/employees', (req, res) => {
    let body = req.body;
    let sql = "INSERT INTO EMPLOYEES(EMPCODE, NAME, DEPARTMENT, DESIGNATION, SALARY, GENDER) VALUES($1, $2, $3, $4, $5, $6)";
    client.query(sql, [body.empCode, body.name, body.department, body.designation, body.salary, body.gender], (err) => {
        if (err) return res.status(404).json(`ERROR : ${err.message}`);
        else return res.status(200).json(body)
    })
})






































// app.get('/svr/resetData', (req, res) => {
//     let sql = "DELETE FROM EMPLOYEES";
//     client.query(sql, (err) => {
//         if (err) console.log('ERROR: ', err);
//         else {
//             let employeeArr = employeesData.map(employee => [employee.empCode, employee.name, employee.department, employee.designation, employee.salary, employee.gender])
//             let sql2 = 'INSERT INTO EMPLOYEES(empCode, name, department, designation, salary, gender) VALUES ?';
//             client.query(sql2, [employeeArr], (err) => {
//                 if (err) console.log('ERROR : ', err.message);
//                 else {
//                     return res.status(200).json({ message: "DATA RESET SUCCESSFULLY" })
//                 }
//             })
//         }
//     })
// })
