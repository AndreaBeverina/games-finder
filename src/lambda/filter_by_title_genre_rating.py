###################### FILTER BY TITLE ###################### 

# import boto3
# import os
# import csv

# s3 = boto3.client('s3')

# def lambda_handler(event, context):
    
#     # read CSV_FILE_PATH from environment variable
#     log_file_path = os.environ['CSV_FILE_PATH']
    
#     if log_file_path is not None:
#         bucket = log_file_path.split("/")[2]
#         key = log_file_path.split("/", 3)[3]
#         print("bucket: {}".format(bucket))
#         print("key: {}".format(key))
        
#         data = s3.get_object(Bucket=bucket, Key=key)['Body'].read().decode("utf-8")
#         csvreader = csv.reader(data.splitlines())
#         games = []
#         games_for_check = []
#         selected_title = event.get("title", "")
#         print("select games containing title '{}':".format(selected_title))
        
        
#         count_tot = 0
#         count_match = 0
        
#         for row in csvreader:
#             count_tot = count_tot + 1
#             title = row[1]
#             if (games_for_check.count(title) == 0) and (title.lower().__contains__(selected_title.lower()) or selected_title == title):
#                 count_match = count_match + 1
#                 game = {
#                     "id": row[0],
#                     "title": row[1],
#                     "release_date": row[2],
#                     "team": row[3],
#                     "rating": row[4],
#                     "genres": row[7],
#                     "summary": row[8]
#                     }
#                 games.append(game)
#                 games_for_check.append(game["title"])
                    
#         print("matches {} of {}".format(count_match, count_tot))
#         return {"games": games}
        
        
#     else:
#         raise Exception("'CSV_FILE_PATH' environment variable not set!")


###################### FILTER BY GENRE ###################### 
# import boto3
# import os
# import csv

# s3 = boto3.client('s3')

# def lambda_handler(event, context):
    
#     # read CSV_FILE_PATH from environment variable
#     log_file_path = os.environ['CSV_FILE_PATH']
    
#     if log_file_path is not None:
#         bucket = log_file_path.split("/")[2]
#         key = log_file_path.split("/", 3)[3]
#         print("bucket: {}".format(bucket))
#         print("key: {}".format(key))
        
#         data = s3.get_object(Bucket=bucket, Key=key)['Body'].read().decode("utf-8")
#         csvreader = csv.reader(data.splitlines())
#         games = []
#         games_for_check = []
#         selected_genre = event.get("genre", "")
#         print("select games by genre '{}':".format(selected_genre))
        
#         count_tot = 0
#         count_match = 0
        
#         for row in csvreader:
#             count_tot = count_tot + 1
#             genre = row[7]
#             title = row[1]
#             if (games_for_check.count(title) == 0) and (genre.count(selected_genre) > 0):
#                 count_match = count_match + 1
#                 game = {
#                     "id": row[0],
#                     "title": row[1],
#                     "release_date": row[2],
#                     "team": row[3],
#                     "rating": row[4],
#                     "genres": row[7],
#                     "summary": row[8]
#                     }
#                 games.append(game)
#                 games_for_check.append(game["title"])
                    
#         print("matches {} of {}".format(count_match, count_tot))
#         return {"games": games}
        
        
#     else:
#         raise Exception("'CSV_FILE_PATH' environment variable not set!")
        
###################### FILTER BY RATING  ######################

# import boto3
# import os
# import csv

# s3 = boto3.client('s3')

# def lambda_handler(event, context):
    
#     # read CSV_FILE_PATH from environment variable
#     log_file_path = os.environ['CSV_FILE_PATH']
    
#     if log_file_path is not None:
#         bucket = log_file_path.split("/")[2]
#         key = log_file_path.split("/", 3)[3]
#         print("bucket: {}".format(bucket))
#         print("key: {}".format(key))
        
#         data = s3.get_object(Bucket=bucket, Key=key)['Body'].read().decode("utf-8")
#         csvreader = csv.reader(data.splitlines())
#         games = []
#         games_for_check = []
#         selected_rating_bot = event.get("rating_bot","")
#         if selected_rating_bot != "Rating" and selected_rating_bot != "":
#             selected_rating_bot = float(selected_rating_bot)
#         selected_rating_top = event.get("rating_top","")
#         if selected_rating_top != "Rating" and selected_rating_top != "":
#             selected_rating_top = float(selected_rating_top)
#         print("select games by rating {} - {}:".format(selected_rating_bot, selected_rating_top))
        
#         count_tot = 0
#         count_match = 0
        
#         for row in csvreader:
#             count_tot = count_tot + 1
#             rating = row[4]
#             if rating != "Rating" and rating != "":
#                 rating = float(rating)
#                 title = row[1]
#                 if (games_for_check.count(title) == 0) and (rating >= selected_rating_bot) and (rating <= selected_rating_top):
#                     count_match = count_match + 1
#                     game = {
#                         "id": row[0],
#                         "title": row[1],
#                         "release_date": row[2],
#                         "team": row[3],
#                         "rating": row[4],
#                         "genres": row[7],
#                         "summary": row[8]
#                         }
#                     games.append(game)
#                     games_for_check.append(game["title"])
                    
#         print("matches {} of {}".format(count_match, count_tot))
#         return {"games": games}
        
        
#     else:
#         raise Exception("'CSV_FILE_PATH' environment variable not set!")