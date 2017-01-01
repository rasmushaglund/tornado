from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_restful import Api

app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'rasse'
app.config['MYSQL_DATABASE_DB'] = 'tornado'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

api = Api(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:rasse@localhost/tornado'
db = SQLAlchemy(app)
