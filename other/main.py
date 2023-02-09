from data_generator import *
from books import *
from reviews import *
from pymongo import MongoClient
from constants import MONGO_URI, AUTHORS_COLLECTION, DB_NAME, BOOKS_COLLECTION, USERS_COLLECTION, REVIEWS_COLLECTION

def main():
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
    reviews_cl = client[DB_NAME][REVIEWS_COLLECTION]
    reviews_cl.drop()

    # Generation and insert
    #Gen: Users publishers
    publishers_df = user_generator(total_users, role="publisher")
    user_post(publishers_df)
    publishers_df = mongo_to_df(USERS_COLLECTION, DB_NAME, MONGO_URI)

    #Gen: Authors
    df_authors = authors_gen(total_authors)
    df_to_mongo(df_authors, AUTHORS_COLLECTION, DB_NAME, MONGO_URI)
    df_authors = mongo_to_df(AUTHORS_COLLECTION, DB_NAME, MONGO_URI)

    #Post books
    book_post(df_authors, publishers_df, total_books)

    #Reviewers generator
    reviewers_df = user_generator(total_users, role="reviewer")
    user_post(reviewers_df)
    review_post(mongo_to_df(BOOKS_COLLECTION, DB_NAME, MONGO_URI))

if __name__ == '__main__':
    main()