import pandas as pd
from flask import Flask, request
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import NearestNeighbors

movies = pd.read_csv("movies.csv")
ratings = pd.read_csv("ratings.csv")

# Removing duplicate rows
movies.drop_duplicates(inplace=True)
ratings.drop_duplicates(inplace=True)

# Removing missing values
movies.dropna(inplace=True)
ratings.dropna(inplace=True)

# Extracting the genres column
genres = movies["genres"]

# Creating an instance of the OneHotEncoder
encoder = OneHotEncoder()

# Reshape the genres column
reshaped_genres = genres.values.reshape(-1, 1)

# View output of reshape call
# print(reshaped_genres)

# Fitting the genres column
genres_encoded = encoder.fit_transform(reshaped_genres)

# Creating an instance of the NearestNeighbors class
recommender = NearestNeighbors(metric="cosine")

# Fitting the encoded genres to the recommender
recommender.fit(genres_encoded.toarray())

app = Flask(__name__)


@app.route("/")
def recommend_movie():
    id = int(request.args.get("id"))

    # Confirm the movie is indexed correctly
    print(movies.iloc[id])

    # Number of recommendations to return
    num_recommendations = 5

    # Getting the recommendations
    _, recommendations = recommender.kneighbors(
        genres_encoded[id].toarray(), n_neighbors=num_recommendations
    )

    # Extracting the movie titles from the recommendations
    recommended_movie_titles = movies.iloc[recommendations[0]]["title"]

    # Showing the recommended movie titles
    # print(recommended_movie_titles)

    return str(recommended_movie_titles)


# Case to prove the effectiveness of recommendation system
# movieId                                                 1977
# title      Friday the 13th Part IV: The Final Chapter (1984)
# genres                                                Horror
# Name: 1454, dtype: object
# 4413                         Ring of Terror (1962)
# 8666                             It Follows (2014)
# 1473               Exorcist II: The Heretic (1977)
# 5133               Night of the Living Dead (1990)
# 1465    Prom Night IV: Deliver Us From Evil (1992)
