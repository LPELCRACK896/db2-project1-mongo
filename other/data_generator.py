from faker import Faker
import pandas as pd
from pymongo import MongoClient
from constants import URL
import json
import requests
import random

def authors_gen(total_authors):
    faker = Faker()
    return pd.DataFrame([{"name": faker.name(),"age":faker.random_int(min=18, max=65, step=1)} for _ in range(total_authors)])

def user_generator(total_users,  role = "user"):
    roles = ["user", "publisher", "reviewer"]
    usr_img = random.choice(['default_user_1', 'default_user_2', 'default_user_3', 'default_user_4', 'default_user_5', 'default_user_6', 'default_user_7'])
    if role not in roles: raise Exception('Not valid user')
    faker = Faker()
    return pd.DataFrame([{"username": faker.name(),"email":faker.email(), "password": "admin123", "role": role, "image":usr_img} for _ in range(total_users)])
    

def df_to_mongo(df, collection, db_name, mongo_uri):
    if collection=="user": raise Exception(f"Insert direclty to DB any other collection. NO {collection}")
    
    client = MongoClient(mongo_uri)
    collection = client[db_name][collection]

    data = df.to_dict("records")
    collection.insert_many(data)
    return True

def user_post(df):

    data = df.to_dict("records")
    headers = {"Content-Type": "application/json"}

    for row in data:
        json_data = json.dumps(row)
        response = requests.post(f"{URL}/api/v1/auth/register", data=json_data, headers=headers)
        print(response)

    return True

def mongo_to_df(collection, db_name, mongo_uri):
    
    client = MongoClient(mongo_uri)
    collection = client[db_name][collection]
    cursor = collection.find()

    data = list(cursor)

    return pd.DataFrame(data)

