import json
from datetime import datetime

# Generate 20 comments with specified structure
comments = []
for i in range(20):
    comment = {
        "Content": f"Comment content {i + 1}",
        "createTime": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "LinkedPostID": f"PostID_{i + 1}",
        "commentUserID": ""  # Set commentUserID to an empty string
    }
    comments.append(comment)

# Convert the comments list to a JSON-style object
with open('comments.json', 'w') as json_file:
    json.dump(comments, json_file, indent=4)