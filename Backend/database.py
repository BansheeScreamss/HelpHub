from dotenv import load_dotenv, dotenv_values
import MySQLdb
import os

config = dotenv_values(".venv")

connection = MySQLdb.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "helphub",
    autocommit = True 
)

cursor  = connection.cursor()

if connection:
    print("Connection is succesful")
else:
    print("no connection")
    
