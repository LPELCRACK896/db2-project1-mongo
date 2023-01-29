from authors import *
from books import *
from pymongo import MongoClient
from constants import MONGO_URI, AUTHORS_COLLECTION, DB_NAME, BOOKS_COLLECTION, CSV_AUTH_FILENAME

# Variables
total_authors = 500
total_books = 2000

# Drop collection before insert

client = MongoClient(MONGO_URI)
authors_cl = client[DB_NAME][AUTHORS_COLLECTION]
authors_cl.drop()
books_cl = client[DB_NAME][BOOKS_COLLECTION]
books_cl.drop()

# Generation and insert

authors_gen(CSV_AUTH_FILENAME, total_authors)
csv_to_mongo(CSV_AUTH_FILENAME, AUTHORS_COLLECTION, DB_NAME, MONGO_URI)
mongo_back_to_csv(CSV_AUTH_FILENAME, AUTHORS_COLLECTION, DB_NAME, MONGO_URI)
book_post(CSV_AUTH_FILENAME, total_books)