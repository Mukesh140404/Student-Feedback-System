create table login_users
(
    id int primary key auto_increment,
    username varchar(30),
    email varchar(50),
    password varchar(50)
)

create table All_feedback
(
    id int primary key auto_increment,
    username varchar(30),
    faculty_name varchar(50),
    QR varchar(10),
    Q7 varchar(50),
    Q8 varchar(50),
    date Date,
    time time
)
create table students
(
    username varchar(30) primary key,
    full_name varchar(30),
    email varchar(50),
    contact varchar(15),
    image varchar(255),
    description text,
    password varchar(50),
    gender char(1),
    DOB Date,
    created_at DATETIME,
    last_update DATETIME
)
create table faculty
(
    id int primary key auto_increment,
    f_name varchar(30),
    f_description varchar(50),
    contact varchar(15),
    added_at datetime
)