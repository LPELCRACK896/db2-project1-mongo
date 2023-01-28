from authors import *
from books import *
from pymongo import MongoClient
from constants import MONGO_URI

filename = "./other/authors.csv"
collection = "authors"
# Drop collection before insert

client = MongoClient(MONGO_URI)
authors_cl = client["test_db_projectdb2"][collection]
authors_cl.drop()
books_cl = client["test_db_projectdb2"]["books"]
books_cl.drop()

# Generation and insert

authors_gen(filename)
csv_to_mongo(filename, collection)
mongo_back_to_csv(filename, collection)
book_post(filename, 2000)