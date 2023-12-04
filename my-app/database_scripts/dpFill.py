import sys
import getopt
import http.client
import urllib
import json
from random import randint
from random import choice
from datetime import date
from time import mktime

def usage():
    print('dbFill.py -u <baseurl> -p <port> -n <numUsers> -t <numTasks>')

# def pushUiuc(conn,headers):
#     uiucUserCount = len(uiucNetid)
#     uiucNetid =["xinyia2", "longma2", "haoyus2", "yining16", "tingyin4", "xu89","binglin3","shulinp2", "zbian4" , "deepakv", "zhang414"]
#     uiucPassword = '123456'
# #     uiucPasswords =  [
# #     'H2"?V">1Ftn}',
# #     'y^d6H=XTTzTj',
# #     '.)!J0.4~:;QQ',
# #     'qY99h#Hi2u_.',
# #     'G(/2mjfmg2})',
# #     'nz-!Z<[mr(1R',
# #     'SNV^K\;BhG81',
# #     'vgB>9z`iL#$^',
# #     't|0/L/![?]AP',
# #     'WFisCcD6,8W0',
# #     'eo5"P+CJK@8S'
# # ]
#     for i in range(uiucUserCount):
#         params = urllib.parse.urlencode({'netID': uiucNetid[i], 'password': uiucPassword })

#         # POST the uiuc user
#         conn.request("POST", "/api/uiucs", params, headers) #to change the path later
#         response = conn.getresponse()
#         data = response.read()
#         d = json.loads(data)


def pushPostandComment(conn, headers, userIDs):
    # Load posts and comments data from JSON files
    with open("posts.json", 'r') as file:
        data_posts = json.load(file)
    with open("comments.json", 'r') as file:
        data_comments = json.load(file)

    # Iterate over the posts
    for i in range(len(data_posts)):
        post = data_posts[i]
        comment = data_comments[i]

        # Set random likes and user ID
        likes = randint(0, 99)
        x = randint(0, len(userIDs) - 1)
        y = randint(0, len(userIDs) - 1)
        postUserID = userIDs[x]
        commentUserID = userIDs[y]

        # Update the post data
        post["likes"] = likes
        post["postUserId"] = postUserID

        # Convert post data to URL-encoded string
        params = urllib.parse.urlencode(post)

        # Post the post data
        # TO DO change url later
        conn.request("POST", "/api/postdb", params, headers) 
        
        # Handle the response to get the post _id
        response = conn.getresponse()
        if response.status == 200:
            post_response_data = json.loads(response.read())
            post_id = post_response_data["_id"]  # Assuming the response contains the _id

            # Update the comment with the post _id
            comment["LinkedPostID"] = post_id
            comment["commentUserID"] = commentUserID

            # Convert comment data to URL-encoded string
            comment_params = urllib.parse.urlencode(comment)

            # Post the comment data
            conn.request("POST", "/api/commentdb", comment_params, headers)
            # Handle the response for the comment post, if needed
        else:
            print("Error posting to /api/postdb")

        # You may need to handle closing the response, etc.





def main(argv):
    # Server Base URL and port
    baseurl = "localhost"
    port = 4000

    try:
        opts, args = getopt.getopt(argv,"hu:p:n:t:",["url=","port=","users=","tasks="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)
     
        # Server to connect to (1: url, 2: port number)
        conn = http.client.HTTPConnection(baseurl, port)

        # HTTP Headers
        headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}

        # Array of user IDs
        userNames =  [
    "zhang414@illinois.edu",
    "deepakv@illinois.edu",
    "zbian4@illinois.edu",
    "shulinp2@illinois.edu",
    "binglin3@illinois.edu",
    "xu89@illinois.edu",
    "tingyin4@illinois.edu",
    "yining16@illinois.edu",
    "haoyus2@illinois.edu",
    "longma2@illinois.edu",
    "xinyia2@illinois.edu",
    "123456@illinois.edu"
]
    pushPostandComment(conn, headers, userNames)    
    # Exit gracefully
    print("End the filling proccess")
    conn.close()


