import json
import requests
import pandas as pd
from faker import Faker
from constants import URL
import random 

def book_post(filename_authors, filename_publishers,total_books):
    categorias = ["Aventura", "Ciencia ficcion", "Fantasia", "Gotica", "Novela negra", "Romance", "Biografia", "Distopia"]
    df_authors = pd.read_csv(filename_authors)
    df_publishers = pd.read_csv(filename_publishers)

    faker = Faker()
    for _ in range(total_books):
        random_row = df_authors.sample(n=1)
        author_id = random_row.iloc[0]['_id']
        random_row = df_publishers.sample(n=1)
        publisher_id = random_row.iloc[0]['_id']
        book = {"title": faker.sentence(nb_words=4), "author": author_id, "publisher": publisher_id, "pages": faker.random_int(min=18, max=65, step=1),"year": faker.random_int(min=1800, max=2023, step=1), "isbn": faker.isbn10(separator=''), "desc": ' '.join([faker.sentence() for _ in range(random.randint(4, 6))]), "category": random.choice(categorias)}
        # Convert the dictionary to a JSON string
        json_data = json.dumps(book)

        # Set the request headers
        headers = {"Content-Type": "application/json"}

        response = requests.post(f"{URL}/api/v1/books", data=json_data, headers=headers)
        print(response)
        if response.status_code!=201:
            print(response.content)
                