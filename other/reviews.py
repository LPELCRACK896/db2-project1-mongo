import json
import requests
from constants import URL
from faker import Faker

def review_post(df_books):
    reviewer = {"username": "eladmin","email":"admin@email.com", "password": "admin123", "role": "user"}
    json_data = json.dumps(reviewer)
    headers = {"Content-Type": "application/json"}
    response = requests.post(f"{URL}/api/v1/auth/register", data=json_data, headers=headers)
    print(response)
    token = response.json().get("token")
    headers["Authorization"] = f"Bearer {token}" 
    faker = Faker()
    for index, row in df_books.iterrows():
        data = { "title": faker.sentence(nb_words=4), "rating": faker.random_int(min=1, max=10, step=1), "text": faker.paragraph()}
        bookid = str(row['_id'])
        json_data = json.dumps(data)
        response = requests.post(f"{URL}/api/v1/books/{bookid}/reviews", data=json_data, headers=headers)
        print(response)
