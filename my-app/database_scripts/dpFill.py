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

def pushUiuc(conn,headers):
    uiucUserCount = len(uiucNetid)
    uiucNetid =["xinyia2", "longma2", "haoyus2", "yining16", "tingyin4", "xu89","binglin3","shulinp2", "zbian4" , "deepakv", "zhang414"]
    uiucPassword = '123456'
#     uiucPasswords =  [
#     'H2"?V">1Ftn}',
#     'y^d6H=XTTzTj',
#     '.)!J0.4~:;QQ',
#     'qY99h#Hi2u_.',
#     'G(/2mjfmg2})',
#     'nz-!Z<[mr(1R',
#     'SNV^K\;BhG81',
#     'vgB>9z`iL#$^',
#     't|0/L/![?]AP',
#     'WFisCcD6,8W0',
#     'eo5"P+CJK@8S'
# ]
    for i in range(uiucUserCount):
        params = urllib.parse.urlencode({'netID': uiucNetid[i], 'password': uiucPassword })

        # POST the user
        conn.request("POST", "/api/uiucs", params, headers) #to change the path later
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)

def pushComment(conn,headers,userIDs):

    return



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
        userIDs = []
        userNames = []  

