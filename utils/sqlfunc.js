import mysql from 'mysql2';
import run from "../app.js"
import * as dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

async function getdepartments () {
    let data = await pool.query(`SELECT * FROM department`);
    for (let i = 0; i < data[0].length; i++) {
        //console.log(data.length)
        //console.log(data)
        console.log(`\nDepartment: ${data[0][i].id} || ${data[0][i].department_name}\n`)
    }
    //console.log(data[0]);
    setTimeout(run.whatdo, 1000)
};

async function getroles () {
    let data = await pool.query(`SELECT * FROM roles`)

    for (let i = 0; i < data[0].length; i++) {
        console.log(`\nRole id: ${data[0][i].id} || Title: ${data[0][i].title} || Salary: ${data[0][i].salary} || Department: ${data[0][i].department_id}`)
    }

    //console.log(data[0])
    setTimeout(run.whatdo, 1000)
};

async function getemployees () {
    let data = await pool.query(`SELECT * FROM employee`)

    for (let i = 0; i < data[0].length; i++) {
        console.log(`\nEmployee id: ${data[0][i].id} || First Name: ${data[0][i].first_name} || Last name: ${data[0][i].last_name} || Role: ${data[0][i].role_id} || Manager: ${data[0][i].manager_id}`)
    }
    //console.log(data[0])
    setTimeout(run.whatdo, 1000)
};

async function departmentfunc (data) {
    await pool.query(`INSERT INTO department (department_name) VALUES ("${data.name}")`)
    setTimeout(run.whatdo, 1000)
}

async function rolefunc (data) {
    await pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", "${data.department_id}")`)
    setTimeout(run.whatdo, 1000)
}

async function employeefunc (data) {
    await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", "${data.role_id}", "${data.manager_id}")`)
    setTimeout(run.whatdo, 1000)
}

async function employeefunc2 (data) {
    await pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${data.first_name}", "${data.last_name}", "${data.role_id}")`)
    setTimeout(run.whatdo, 1000)
}

async function updaterole (data) {
    await pool.query(`UPDATE employee SET role_id = ${data.role_id} WHERE id=${data.employee_id};`)
    setTimeout(run.whatdo, 1000)
}

async function getmanager (data) {
    let tell = await pool.query(`SELECT * FROM employee WHERE manager_id=${data.id}`)
    for (let i = 0; i < tell[0].length; i++) {
        console.log(`\nEmployee id: ${tell[0][i].id} || First Name: ${tell[0][i].first_name} || Last name: ${tell[0][i].last_name} || Role: ${tell[0][i].role_id} || Manager: ${tell[0][i].manager_id}`)
    }
    setTimeout(run.whatdo, 1000)
}

async function viewdepartment (data) {
  let tell = await pool.query(`SELECT employee.* FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id WHERE department.id = ${data.id};`)
  for (let i = 0; i < tell[0].length; i++) {
    console.log(`\nEmployee id: ${tell[0][i].id} || First Name: ${tell[0][i].first_name} || Last name: ${tell[0][i].last_name} || Role: ${tell[0][i].role_id} || Manager: ${tell[0][i].manager_id}`)
}
    setTimeout(run.whatdo, 1000)
}

async function getbudget (data) {
    let tell = await pool.query(`SELECT SUM(roles.salary) AS sum FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id WHERE department.id = ${data.id};`)
    console.log(`\n${tell[0][0].sum}`)

    setTimeout(run.whatdo, 1000)
}

async function updatemanager (data) {
    await pool.query(`UPDATE employee SET manager_id = ${data.manager_id} WHERE id=${data.employee_id};`)
    setTimeout(run.whatdo, 1000)
}

async function departmentdel (data) {
    await pool.query(`DELETE FROM department WHERE id=${data.id};`);
    (err) => err ? console.log(nonono) : console.log("Write success!")
    setTimeout(run.whatdo, 1000)
}

async function roledel (data) {
    await pool.query(`DELETE FROM roles WHERE id=${data.id};`)
    setTimeout(run.whatdo, 1000)
}

async function employeedel (data) {
    await pool.query(`DELETE FROM employee WHERE id=${data.id};`)
    setTimeout(run.whatdo, 1000)
}

//SELECT employee.* FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id WHERE department.id = 1;
//SELECT SUM(roles.salary) FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id WHERE department.id = 1;
export default {
    getdepartments,
    getroles,
    getemployees,
    departmentfunc,
    rolefunc,
    employeefunc,
    employeefunc2,
    updaterole,
    getmanager,
    viewdepartment,
    getbudget,
    updatemanager,
    departmentdel,
    roledel,
    employeedel
};
//UPDATE employee SET role_id = 1 WHERE id=2;