from flask import *
from flask_cors import CORS
import mysql.connector
import hashlib

database = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    port=8889,
    database="homomorphicvote_db"
)

SALT = "OURSSINGH TACHLHIT IS OUR SECRET SALT".encode('utf-8')

USER_INSERTION_REQUEST = "INSERT INTO users(username, hashed_password) VALUES (%s, %s)"
USER_SELECTION_REQUEST = "SELECT id, username, hashed_password FROM users WHERE username=%s AND hashed_password=%s"
USER_SELECTIO_WITH_USERID_REQUEST = "SELECT id, username FROM users WHERE id=%s"
USER_SELECTION_WITH_USERNAME_REQUEST = "SELECT id, username FROM users WHERE username=%s"
ELECTION_INSERTION_REQUEST = "INSERT INTO elections(owner, name, question, responses, responses_len, voters_count, public_key, tally) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
ELECTION_SELECTION_WITH_ELECTIONID_REQUEST = "SELECT id, name, question, responses, responses_len, voters_count, public_key, tally, owner, result FROM elections WHERE id=%s"
ELECTION_UPDATE_RESULT = "UPDATE elections SET result = %s WHERE id = %s"
VOTE_SELECTION_WITH_USERID_AND_ELECTIONID_REQUEST = "SELECT id, user, election, hashed_vote FROM user_votes WHERE user=%s AND election=%s"
VOTE_SELECTION_WITH_ELECTIONID_REQUEST = "SELECT id, user, election, hashed_vote FROM user_votes WHERE election=%s"
VOTE_INSERTION_REQUEST = "INSERT INTO user_votes(user, election, hashed_vote) VALUES(%s, %s, %s)"
ELECTION_UPDATE_TALLY_REQUEST = "UPDATE elections SET tally = %s WHERE id = %s"
USER_ELECTION_INSERTION_REQUEST = "INSERT INTO user_elections(user, election) VALUES (%s, %s)"
USER_ELECTION_SELECTION_WITH_USERID_REQUEST = "SELECT user, election FROM user_elections WHERE user=%s"

app = Flask(__name__)
CORS(app, origins= "*", supports_credentials=True)
app.secret_key = "ayush"  

@app.route('/api/signup', methods = ['POST'])
def signup():
    # username and password are passed to this routing as POST
    # this is only secure if we use SSL
    username = request.form.get('username')
    password = request.form.get('password')

    # TODO: protect against SQL injection

    val = (username,)
    mycursor = database.cursor()
    mycursor.execute(USER_SELECTION_WITH_USERNAME_REQUEST, val)
    fetched_users = mycursor.fetchall()
    if len(fetched_users) > 0:
        return jsonify({
            "status": "error",
            "message": "The username '" + username + "' already exists!"
        })

    kefta = hashlib.sha512()
    kefta.update(SALT)
    kefta.update(password.encode('utf-8'))
    hashed_password =  kefta.hexdigest()

    val = (username, hashed_password)

    mycursor = database.cursor()
    mycursor.execute(USER_INSERTION_REQUEST, val)
    database.commit()
    return jsonify({
        "status": "ok"
    })

@app.route('/api/signin', methods = ['POST'])
def signin():
    username = request.form.get('username')
    password = request.form.get('password')

    kefta = hashlib.sha512()
    kefta.update(SALT)
    kefta.update(password.encode('utf-8'))
    hashed_password =  kefta.hexdigest()

    # TODO: protect against SQL injection

    val = (username, hashed_password)
    mycursor = database.cursor()
    mycursor.execute(USER_SELECTION_REQUEST, val)
    fetched_users = mycursor.fetchall()
    if len(fetched_users) == 0:
        return jsonify({
            "status": "error",
            "message": "The username '%s' is not registered!" % (username)
        })
    fetched_user = fetched_users[0]
    session['username'] = username
    session['userid'] = fetched_user[0]
    return jsonify({
        "status": "ok"
    })

@app.route('/api/signout')
def signout():
    session.pop("username", None)
    session.pop("userid", None)
    return jsonify({
        "status": "ok"
    })

@app.route('/api/islogged')
def isLogged():
    if 'username' in session:
        return "true"  # TODO: return a valid answer
    else:
        return "false"  # TODO: return a valid answer

@app.route('/api/election/create', methods = ['POST'])
def createVote():
    # TODO: check is is connected
    owner = session['userid']

    name = request.form.get('name')
    question = request.form.get('question')
    responses = request.form.get('options')
    responses_len = len(responses.split(";"))
    voters = request.form.get('voters')
    voters = voters.split(",")
    public_key = request.form.get('public_key')
    encrypted_0 = request.form.get('encrypted_0')

    val = (owner, name, question, responses, responses_len, len(voters), public_key, encrypted_0)
    mycursor = database.cursor()
    mycursor.execute(ELECTION_INSERTION_REQUEST, val)
    election_id = mycursor.lastrowid

    for voter in voters:
        val = (voter,)
        mycursor = database.cursor()
        mycursor.execute(USER_SELECTION_WITH_USERNAME_REQUEST, val)
        fetched_users = mycursor.fetchall()
        if len(fetched_users) == 0:
            continue
        voter_id = fetched_users[0][0]
        val = (voter_id, election_id)
        mycursor.execute(USER_ELECTION_INSERTION_REQUEST, val)
    database.commit()
    return jsonify({
        "status": "ok"
    })

def getUsernameByUserID(id, mycursor):
    val = (id,)
    mycursor.execute(USER_SELECTIO_WITH_USERID_REQUEST, val)
    user = mycursor.fetchone()
    return user[1]

@app.route('/api/election/list')
def getElections():
    # TODO: check is is connected
    userid = session['userid']

    responses = []

    val = (userid, )
    mycursor = database.cursor()
    mycursor.execute(USER_ELECTION_SELECTION_WITH_USERID_REQUEST, val)
    fetcheds = mycursor.fetchall()
    for fetched in fetcheds:
        election_id = fetched[1]
        val =(election_id,)
        mycursor.execute(ELECTION_SELECTION_WITH_ELECTIONID_REQUEST, val)
        election = mycursor.fetchone()

        mycursor.execute(VOTE_SELECTION_WITH_ELECTIONID_REQUEST, val)
        votes = mycursor.fetchall()

        responses.append({
            "id": election[0],
            "name": election[1],
            "bulltinBoard": [{"username": getUsernameByUserID(vote[1], mycursor), "hashed_vote": vote[3]} for vote in votes],
            "question": election[2],
            "options": election[3].split(";"),
            "voters_count": election[5],
            "public_key": election[6],
            "results": election[9].split(";") if election[9] != None else None,
            "isOwner": election[8] == userid
        })
    return jsonify({
        "status": "ok",
        "result": responses
    });

@app.route('/api/election/vote', methods = ['POST'])
def vote():
    # TODO: check is is connected
    userid = session['userid']
    election = request.form.get('election')
    vote = int(request.form.get('vote'))
    hashed_vote = request.form.get('hashed_vote')

    mycursor = database.cursor()

    val = (userid, election)
    mycursor.execute(VOTE_SELECTION_WITH_USERID_AND_ELECTIONID_REQUEST, val)
    votes = mycursor.fetchall()
    if len(votes) > 0:
        return jsonify({
            "status": "error",
            "message": "You already voted for that election!"
        });

    val =(userid, election, hashed_vote)
    mycursor.execute(VOTE_INSERTION_REQUEST, val)

    val =(election,)
    mycursor.execute(ELECTION_SELECTION_WITH_ELECTIONID_REQUEST, val)
    election = mycursor.fetchone()

    public_key = election[6]
    n = int(public_key.split("/")[0])
    tally = int(election[7])
    new_tally = tally*vote % (n**2)

    val = (str(new_tally), election[0])
    mycursor.execute(ELECTION_UPDATE_TALLY_REQUEST, val)
    database.commit()

    return jsonify({
        "status": "ok"
    });

@app.route('/api/election/tally', methods = ['POST'])
def getTally():
    election = request.form.get('election')
    
    val =(election,)
    mycursor = database.cursor()
    mycursor.execute(ELECTION_SELECTION_WITH_ELECTIONID_REQUEST, val)
    election = mycursor.fetchone()

    return jsonify({
        "status": "ok",
        "tally": election[7]
    });

@app.route('/api/election/postResult', methods = ['POST'])
def setResult():
    # TODO: check is is connected
    userid = session['userid']
    election = request.form.get('election')
    result = request.form.get('result')

    val =(election,)
    mycursor = database.cursor()
    mycursor.execute(ELECTION_SELECTION_WITH_ELECTIONID_REQUEST, val)
    election = mycursor.fetchone()

    if election[8] != userid:
        return jsonify({
            "status": "error",
            "message": "You can't update this election result"
        });

    val = (result, election[0])
    print(val)
    mycursor.execute(ELECTION_UPDATE_RESULT, val)
    database.commit()

    return jsonify({
        "status": "ok"
    });

@app.route('/api/election/result', methods = ["POST"])
def getResult():
    election = request.form.get('election')

    val =(election,)
    mycursor = database.cursor()
    mycursor.execute(ELECTION_SELECTION_WITH_ELECTIONID_REQUEST, val)
    election = mycursor.fetchone()

    return jsonify({
        "status": "ok",
        "result": election[9].split(";")
    });
