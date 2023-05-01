import inquirer from "inquirer";
import querys from "./utils/sqlfunc.js"
function whatdo () {
    inquirer.prompt ([
        {type: "list", message: "What Do", name: "selection", choices:[
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role"
        ]}
    ])
    .then(function (response){
        switch(response.selection) {
            case "View Departments":
                querys.getdepartments()
            break;
            case "View Roles":
                querys.getroles()
            break;
            case "View Employees":
                querys.getemployees()
            break;
            case "Add Department":
                adddepartment()
            break;
            case "Add Role":
                addrole()
            break;
            case "Add Employee":
                addemployee()
            break;
            case "Update Employee Role":
                updaterole()
            break;
                
        }
    })
}

function adddepartment () {
    inquirer.prompt ([
        {type: "input", message: "What is the name of the department", name: "name"}])
        .then(function (response){
            let data = {}
            data.name = response.name
            querys.departmentfunc(data)
        })
    
}

function addrole () {
    inquirer.prompt ([
        {type: "input", message: "What is the title of the role", name: "title"},
        {type: "number", message: "What is the salary of the role", name: "salary"},
        {type: "number", message: "What is the department id of the role", name: "department_id"}
    ])
    .then(function (response){
        let data = {}
        data.title = response.title
        data.salary = response.salary
        data.department_id = response.department_id
        querys.rolefunc(data)
    })

}

function addemployee () {
    inquirer.prompt ([
        {type: "input", message: "What is the employee's first name?", name: "first_name"},
        {type: "input", message: "What is the employees last name?", name: "last_name"},
        {type: "number", message: "What is the employees role id?", name: "role_id"},
        {type: "number", message: "Please enter the manager id of the employee if none enter 0", name: "manager_id"}
    ])
    .then(function(response){
        let data = {}
        data.first_name = response.first_name
        data.last_name = response.last_name
        data.role_id = response.role_id
        if (response.manager_id === 0){
            querys.employeefunc2(data)
        }
        else {
            data.manager_id = response.manager_id
            querys.employeefunc(data)
        }
    })
}

function updaterole (){
    inquirer.prompt ([
        {type: "number", message: "Please enter the id number of the employee that you wish to update", name: "employee_id"},
        {type: "number", message: "Please enter the role id you want to update to", name: "role_id"}

    ])
    .then(function (response){
        let data = {}
        data.employee_id = response.employee_id
        data.role_id = response.role_id
        querys.updaterole(data)
    })
}

whatdo()

export default {whatdo}