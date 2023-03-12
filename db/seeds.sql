INSERT INTO department (dept_name)
VALUE 
    ("IT"),
    ("Engineering"),
    ("Janitorial"),
    ("Leadership");

INSERT INTO role (title, salary, department_id)
VALUE 
    ("Senior Dev", 75000.00, 2),
    ("Engineer", 100000.00, 3),
    ("Cleaner", 35000.00, 1),
    ("CEO", 800000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE 
    ("John", "Doe", 1, 3),
    ("Jane", "Doe", 1, 1),
    ("Andrew", "Bautista", 3, 2), 
    ("Tucker", "Barrett", 5, 2), 
    ("Robert", "Kurle", 5, 2);