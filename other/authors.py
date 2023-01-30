from faker import Faker
import pandas as pd
from pymongo import MongoClient


def authors_gen(filename, total_authors):
    faker = Faker()
    pd.DataFrame([{"name": faker.name(),"age":faker.random_int(min=18, max=65, step=1)} for _ in range(total_authors)]).to_csv(filename, index=False)


def csv_to_mongo(filename, collection, db_name, mongo_uri):
    client = MongoClient(mongo_uri)
    collection = client[db_name][collection]

    df = pd.read_csv(filename)
    data = df.to_dict("records")
    collection.insert_many(data)

def mongo_back_to_csv(filename, collection, db_name, mongo_uri):

    client = MongoClient(mongo_uri)
    collection = client[db_name][collection]
    cursor = collection.find()

    data = list(cursor)

    df = pd.DataFrame(data)

    df.to_csv(filename, index=False)