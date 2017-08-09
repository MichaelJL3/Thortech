
'''
@file insertData.py
@author Michael Laucella
@desc generates two sets of random strings 
	  and inserts them into two different database tables
'''

import random
import sys
import MySQLdb

#get a consonant
def getConsonant():
	#semi accurate distribution of consonant frequencies
	consonants = [
		'b','b',
		'c','c','c',
		'd','d','d','d','d',
		'f','f','f',
		'g','g',
		'h','h','h','h','h','h','h','h',
		'j',
		'k',
		'l','l','l','l','l',
		'm','m','m',
		'n','n','n','n','n','n','n','n','n',
		'p','p',
		'q',
		'r','r','r','r','r','r','r','r',
		's','s','s','s','s','s','s','s',
		't','t','t','t','t','t','t','t','t','t','t','t',
		'v',
		'w','w','w',
		'x',
		'y','y',
		'z'
	]
	
	prob = getRandNumber(0, len(consonants)-1)
	return consonants[prob]

#get a vowel
def getVowel():
	prob = getProbability()
	
	if(prob<=.21):
		return 'a'
	if(prob<=.54):
		return 'e'
	if(prob<=.72):
		return 'i'
	if(prob<=.92):
		return 'o'
		
	return 'u'

#get a random integer (easily modifiable if definition of desired number changes)
def getRandNumber(a,b):
	return random.randint(a, b)	

#get a probablility between 0 and 1
def getProbability():
	return random.random()

#get a random letter using english language character frequencies
def getLetter():
	prob = getProbability()
	
	#probability of selecting a vowel randomly
	if(prob<=.38):
		return getVowel()
	#else consonant
	else:
		return getConsonant()

#get a random string length 
#using an average of 4 letters per word in a gaussian distribution
def getStringLength():
	return int(round(random.gauss(4, 1.5)))

#generate n strings and return as array
def makeStrings(n):
	arrStr=[]

	for i in range(n):
		randStr=""
		#length of string
		length = getStringLength()
		
		for j in range(length):
			c = getLetter()
			randStr+=c

		#append string to array
		arrStr.append(randStr)
		
	return arrStr
	
#generate references for the detail table to map to the master table
def reference(arrStr, numRefs):
	arrTup=[]
	
	#create tuples of (masterID, string)
	for randStr in arrStr:
		arrTup.append((getRandNumber(1, numRefs), randStr))
		
	return arrTup

#save the string array to the master table
def saveStringsIntoMaster(arrStr, ex):
	try:
		ex.executemany("INSERT INTO masterTable (value) values (%s)", arrStr)
	except(MySQLdb.Error) as e:
		print("saving to master error")
		print(e)
		sys.exit(0)

#save the (ID,string) tuples into the detail table
def saveStringsIntoDetail(arrTup, ex):
	try:
		ex.executemany("INSERT INTO detailTable (masterID, value) values (%s, %s)", arrTup)
	except(MySQLdb.Error) as e:
		print("saving to detail error")
		print(e)
		sys.exit(0)

#main function 
#gets the number of strings to make, creates them, inserts into db
def main():
	#get number of strings for master table
	if(len(sys.argv)>1 and isinstance(argv[1], int)):
		numStrMaster = argv[1]
	else:
		numStrMaster = getRandNumber(1, 1000)
	
	#get number of strings for detail table
	if(len(sys.argv)>2 and isinstance(argv[2], int)):
		numStrDetail = argv[2]
	else:
		numStrDetail = getRandNumber(1, 1000)
	
	#establish db connection
	try:
		db = MySQLdb.connect(
			host="localhost",
			user="mike",
			passwd="pass",
			db="Thortech"
		)
			
		ex = db.cursor()
		
	except(MySQLdb.Error) as e:
		print(e)
		sys.exit(0)
		
	#generate and save the string to the db
	saveStringsIntoMaster(makeStrings(numStrMaster), ex)
	saveStringsIntoDetail(reference(makeStrings(numStrDetail), numStrMaster), ex)
	
	ex.close()
	db.commit()
	db.close()

#program entry point
main()