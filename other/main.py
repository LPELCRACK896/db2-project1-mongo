from data_generator import *
from books import *
from pymongo import MongoClient
from constants import MONGO_URI, AUTHORS_COLLECTION, DB_NAME, BOOKS_COLLECTION, CSV_AUTH_FILENAME, CSV_PUBLISHERS_FILENAME, USERS_COLLECTION

# Variables
total_authors = 20
total_books = 1000
total_users = 30

# Drop collection before insert

client = MongoClient(MONGO_URI)
authors_cl = client[DB_NAME][AUTHORS_COLLECTION]
authors_cl.drop()
books_cl = client[DB_NAME][BOOKS_COLLECTION]
books_cl.drop()
users_cl = client[DB_NAME][USERS_COLLECTION]
users_cl.drop()

# Generation and insert
#Gen: Users publishers
publishers_gen(CSV_PUBLISHERS_FILENAME, total_users)
csv_to_mongo(CSV_PUBLISHERS_FILENAME, USERS_COLLECTION, DB_NAME, MONGO_URI)
mongo_back_to_csv(CSV_PUBLISHERS_FILENAME, USERS_COLLECTION, DB_NAME, MONGO_URI)

#Gen: Authors
authors_gen(CSV_AUTH_FILENAME, total_authors)
csv_to_mongo(CSV_AUTH_FILENAME, AUTHORS_COLLECTION, DB_NAME, MONGO_URI)
mongo_back_to_csv(CSV_AUTH_FILENAME, AUTHORS_COLLECTION, DB_NAME, MONGO_URI)

#Post books
book_post(CSV_AUTH_FILENAME, CSV_PUBLISHERS_FILENAME, total_books)



