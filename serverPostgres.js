let express = require("express");
let mysql = require('mysql');
require('dotenv').config();
let cors = require('cors');
const PORT = process.env.PORT || 2410;


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


const { Client } = require("pg")
const client = new Client({
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    // host: process.env.DB_HOST,
    user: "postgres",
    password: "virgoPostgres001",
    port: 5432,
    host: "db.iltljszlsaempjnlkbmh.supabase.co",
    ssl: { rejectUnauthorized: false }
});
client.connect((err) => {
    if (err) console.error('Error connecting to the database:', err);
    else console.log('CONNECTED SECURELY');
});



// @ GET 
// @ ROUTE : /svr/employees/department/:dept
app.get('/svr/employees/department/:dept', (req, res) => {
    let { dept } = req.params;
    let sql = `SELECT * FROM EMPLOYEES WHERE DEPARTMENT = $1`;
    client.query(sql, [dept], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /svr/employees/designation/:designation
app.get('/svr/employees/designation/:designation', (req, res) => {
    let { designation } = req.params;
    let sql = `SELECT * FROM EMPLOYEES WHERE DESIGNATION = $1`;
    client.query(sql, [designation], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /svr/employees/gender/:gender
app.get('/svr/employees/gender/:gender', (req, res) => {
    let { gender } = req.params;
    let sql = `SELECT * FROM EMPLOYEES WHERE GENDER = $1`;
    client.query(sql, [gender], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /svr/employees/:id
app.get('/svr/employees/:id', (req, res) => {
    let { id } = req.params;
    let sql = `SELECT * FROM EMPLOYEES WHERE empcode = $1`;
    client.query(sql, [id], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /svr/employees AND QUERY PARAMS ARE { department, designation, gender }
app.get('/svr/employees', (req, res) => {
    let { department, designation, gender } = req.query;
    const sql = "SELECT * FROM EMPLOYEES";
    client.query(sql, (err, result) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else {
            let data = result.rows;
            data = department ? data.filter(dt => dt.department === department) : data;
            data = designation ? data.filter(dt => dt.designation === designation) : data;
            data = gender ? data.filter(dt => dt.gender === gender) : data;
            return res.status(200).json(data)
        }
    })
})


// @ DELETE 
// @ ROUTE : /svr/employees/:id
app.delete('/svr/employees/:id', (req, res) => {
    let { id } = req.params;
    let sql = `DELETE FROM EMPLOYEES WHERE empcode = $1`;
    client.query(sql, [id], (err) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json({ message: `Employee ${id} Deleted Successfully` })
    })
})


// @ POST
// @ ROUTE : /svr/employees
app.post('/svr/employees', (req, res) => {
    let body = req.body;
    let sql = `INSERT INTO employees(empcode, name, department, designation, salary, gender) VALUES($1, $2, $3, $4, $5, $6)`;
    client.query(sql, [body.empcode, body.name, body.department, body.designation, body.salary, body.gender], (err) => {
        if (err) return res.status(404).json(`ERROR : ${err.message}`);
        else return res.status(200).json(body);
    })
})


// @ PUT
// @ ROUTE : /svr/employees/:id
app.put('/svr/employees/:id', (req, res) => {
    let { id } = req.params;
    let body = req.body;
    let sql = `UPDATE EMPLOYEES SET empcode = $1, name = $2, department = $3, designation = $4, salary = $5, gender = $6 WHERE empcode = $7`;
    client.query(sql, [body.empcode, body.name, body.department, body.designation, body.salary, body.gender, id], (err, data) => {
        if (err) return res.status(404).json({ error: err.message });
        else return res.status(200).json(body);
    });
});



// ---------------------------------------------------------------- FOR RESETING THE DATA


let employeesData = [
    { empcode: 1451, name: "Jack", department: "Finance", designation: "Manager", salary: 52500, gender: "Male" },
    { empcode: 1029, name: "Steve", department: "Technology", designation: "Manager", salary: 71000, gender: "Male" },
    { empcode: 1891, name: "Anna", department: "HR", designation: "Manager", salary: 55100, gender: "Female" },
    { empcode: 1322, name: "Kathy", department: "Operations", designation: "Manager", salary: 49200, gender: "Female" },
    { empcode: 1367, name: "Bob", department: "Marketing", designation: "Manager", salary: 39000, gender: "Male" },
    { empcode: 1561, name: "George", department: "Finance", designation: "Trainee", salary: 22500, gender: "Male" },
    { empcode: 1777, name: "Harry", department: "Technology", designation: "Trainee", salary: 31000, gender: "Male" },
    { empcode: 1606, name: "Julia", department: "HR", designation: "Manager", salary: 25100, gender: "Female" },
    { empcode: 1509, name: "Kristina", department: "Operations", designation: "Trainee", salary: 19200, gender: "Female" },
    { empcode: 1533, name: "William", department: "Marketing", designation: "Trainee", salary: 16200, gender: "Male" },
    { empcode: 1161, name: "Stephen", department: "Finance", designation: "VP", salary: 82500, gender: "Male" },
    { empcode: 1377, name: "Winston", department: "Technology", designation: "VP", salary: 91000, gender: "Male" },
    { empcode: 1206, name: "Victoria", department: "HR", designation: "Manager", salary: 65100, gender: "Female" },
    { empcode: 1809, name: "Pamela", department: "Operations", designation: "VP", salary: 78600, gender: "Female" },
    { empcode: 1033, name: "Tim", department: "Marketing", designation: "VP", salary: 66800, gender: "Male" },
    { empcode: 1787, name: "Peter", department: "Technology", designation: "Manager", salary: 47400, gender: "Male" },
    { empcode: 1276, name: "Barbara", department: "Technology", designation: "Trainee", salary: 21800, gender: "Female" },
    { empcode: 1859, name: "Donna", department: "Operations", designation: "Trainee", salary: 21900, gender: "Female" },
    { empcode: 1874, name: "Igor", department: "Operations", designation: "Manager", salary: 48300, gender: "Male" },
]


// @ PUT
// @ ROUTE : /svr/resetData
app.get('/svr/resetData', (req, res) => {
    let sql = `DELETE FROM EMPLOYEES`;
    client.query(sql, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error resetting data' });
        }
        let employeeArr = employeesData.map(employee => [employee.empcode, employee.name, employee.department, employee.designation, employee.salary, employee.gender]);
        let placeholders = employeeArr.map((_, index) => `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${index * 6 + 5}, $${index * 6 + 6})`).join(', ');
        let sql2 = `INSERT INTO EMPLOYEES(empcode, name, department, designation, salary, gender) VALUES ${placeholders}`;
        client.query(sql2, employeeArr.flat(), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error resetting data' });
            }
            return res.status(200).json({ message: "DATA RESET SUCCESSFULLY" });
        });
    });
});

