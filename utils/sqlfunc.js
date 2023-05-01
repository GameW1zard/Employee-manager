import mysql from 'mysql2';
import run from "../app.js"

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'loyariven13',
    database: 'employee_db'
}).promise();

async function getdepartments () {
    let data = await pool.query(`SELECT * FROM department`);

    for (let i = 0; i < data.length; i++) {
        console.log(`\nDepartment: ${data[0][i].id} || ${data[0][i].department_name}\n`)
    }
    //console.log(data[0]);
    setTimeout(run.whatdo, 1000)
};

async function getroles () {
    let data = await pool.query(`SELECT * FROM roles`)

    for (let i = 0; i < data.length; i++) {
        console.log(`\nRole id: ${data[0][i].id} || Title: ${data[0][i].title} || Salary: ${data[0][i].salary} || Department: ${data[0][i].department_id}`)
    }

    //console.log(data[0])
    setTimeout(run.whatdo, 1000)
};

async function getemployees () {
    let data = await pool.query(`SELECT * FROM employee`)

    for (let i = 0; i < data.length; i++) {
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


export default {
    getdepartments,
    getroles,
    getemployees,
    departmentfunc,
    rolefunc,
    employeefunc,
    employeefunc2,
    updaterole
};
//UPDATE employee SET role_id = 1 WHERE id=2;