
mysql -uroot -ppass < Thortech.sql
mysql -uroot -ppass < Procedures.sql
python insertData.py
./dumpTables.sh
