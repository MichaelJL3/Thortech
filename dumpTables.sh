#!bin/bash

#dump DB into backup file
mysqldump Thortech > gzip > ThortechDump.sql.gz