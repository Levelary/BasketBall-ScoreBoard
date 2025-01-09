create database scoreDB;

use scoreDB;

create table users (
	username varchar(30) PRIMARY KEY, 
    email varchar(30), 
    password varchar(15),
    type varchar(10)
);
truncate table users;
insert into users values("admin1", "admin1@gmail.com", "adminpass", "admin");
insert into users values("user1", "user1@gmail.com", "userpass", "user");
select * from users;

create table players (
	team varchar(30),
	jno int PRIMARY KEY,
    player varchar(30),
    score int
);
truncate table players;
insert into players values('A', 21, "ajay", 3);
select * from players;

create table sets (
	setNo int auto_increment primary key,
    winner varchar(30),
    scoreA int,
    scoreB int
);

truncate table sets;
insert into sets(winner, scoreA, scoreB) values("B", 9, 15);
select * from sets;


truncate table players;
insert into players values('A', 21, "Ajay", 3);
select * from players;

