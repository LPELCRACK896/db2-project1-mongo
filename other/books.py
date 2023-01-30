import json
import requests
import pandas as pd
from faker import Faker
from constants import URL
import random 

def book_post(filename_authors, total_books):
    df = pd.read_csv(filename_authors)
    faker = Faker()
    for _ in range(total_books):
        random_row = df.sample(n=1)
        author_id = random_row.iloc[0]['_id']
        book = {"title": faker.sentence(nb_words=4), "author": author_id, "puslisher": faker.word(), "pages": faker.random_int(min=18, max=65, step=1),"year": faker.random_int(min=1800, max=2023, step=1), "isbn": faker.isbn10(separator=''), "rate": faker.random_int(min=1, max=5, step=1), "desc": ' '.join([faker.sentence() for _ in range(random.randint(4, 6))])}
        print(book)
        # Convert the dictionary to a JSON string
        json_data = json.dumps(book)

        # Set the request headers
        headers = {"Content-Type": "application/json"}

        response = requests.post(f"{URL}/api/v1/books", data=json_data, headers=headers)
        print(response)
        