from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_login import LoginManager
from flask_restful import Api
from flask.ext.bcrypt import Bcrypt

app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'rasse'
app.config['MYSQL_DATABASE_DB'] = 'tornado'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

app.secret_key = 'secret_key'

api = Api(app)
bcrypt = Bcrypt(app)
loginmanager = LoginManager()
loginmanager.init_app(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:rasse@localhost/tornado'
db = SQLAlchemy(app)
