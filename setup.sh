#!bin/bash

mysql -uroot -p < Thortech.sql
mysql -uroot -p < Procedures.sql
python insertData.py
./dumpTables.sh