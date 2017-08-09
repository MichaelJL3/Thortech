#!bin/bash

#restore dumped tables
gunzip < ThortechDump.sql.gz | mysql -uroot -p