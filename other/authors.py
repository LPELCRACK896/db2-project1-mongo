from faker import Faker
import pandas as pd
from pymongo import MongoClient
from constants import MONGO_URI


def authors_gen(filename):
    faker = Faker()
    pd.DataFrame([{"name": faker.name(),"age":faker.random_int(min=18, max=65, step=1)} for i in range(700)]).to_csv(filename, index=False)


def csv_to_mongo(filename, collection):
    client = MongoClient(MONGO_URI)
    collection = client["test_db_projectdb2"][collection]

    df = pd.read_csv(filename)
    data = df.to_dict("records")
    collection.insert_many(data)

def mongo_back_to_csv(filename, collection):

    client = MongoClient(MONGO_URI)
    collection = client["test_db_projectdb2"][collection]
    cursor = collection.find()

    data = list(cursor)

    df = pd.DataFrame(data)

    df.to_csv(filename, index=False)