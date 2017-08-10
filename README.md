
# ThortechMVC

[![Mysql][mysql]](https://www.mysql.com/)
[![Nodejs][node]](https://nodejs.org/en/)
[![React][react]](https://facebook.github.io/react/)

[node]:  icons/nodejs-icon-medium.png "Nodejs"
[mysql]: icons/mysql-icon-medium.png "Mysql"
[react]: icons/react-icon-medium.png "React"

# Description

An MVC project for Thortech interview

presents a model view controller for manipulation and display of simple 
relational structured sql tables

## Note

My first attempts using **scala** and **java** which can be viewed
in the **MVCScala** and **MVCJava** folders were an attempt at MVC
from an application perspective.

These are **incomplete** as I later pondered on the reasoning behind
placing them on **AWS** as a web based MVC so I switched to a much more 
web friendly **JS** stack these files are located in **MVCNode**

For more descriptive information on the MVC
check out [README.md](./MVCNode/api/README.md)
**note** this is a different readme

## Files

**MVCNode** holds the final settled MVC project

for setting up the database/procedures and data manipulations

check out [Procedures.sql](./Procedures.sql) for the SQL procedures
check out [Thortech.sql](./Thortech.sql) for the Initial table/user creation
check out [insertData.py](./insertData.py) a script for inserting data in the DB

there are also a few script files for making compressed backups of the database and restoring them

to also create all the pieces in one shot 
check out [setup.sh](./setup.sh) a script which runs the combined set of programs
