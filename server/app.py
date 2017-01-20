from util import db, app, api, bcrypt, loginmanager
from flask import jsonify, request, session, g
from flask_restful.utils import cors
from flask_restful import reqparse
from flask_login import login_required, login_user, logout_user, current_user

from views.tasks import Tasks
from views.views import Views
from views.lists import Lists
from views.contexts import Contexts
from views.tags import Tags

from models.user import User
from models.view import View
from models.task import Task
from models.context import Context
from models.tag import Tag
from models.list import List

api.add_resource(Tasks, '/tasks')
api.add_resource(Contexts, '/contexts')
api.add_resource(Tags, '/tags')
api.add_resource(Lists, '/lists')
api.add_resource(Views, '/views')

@app.route("/")
def main():
    return "Welcome!"

@app.route("/register", methods=['POST'])
def register():
    json_data = request.json

    try:
        db.session.add(User(email=json_data['email'], password=json_data['password']))
        db.session.commit()
        return jsonify({'status': 'ok'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/login', methods=['POST'])
def login():
    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, help='User email', location='json')
    parser.add_argument('password', type=str, help='User password', location='json')
    parser.add_argument('remember', type=bool, help='Remember me', location='json')
    args = parser.parse_args()

    user = User.query.filter_by(email=args['email']).first_or_404()
    if user and bcrypt.check_password_hash(user.password, args['password']):
        login_user(user, remember=args['remember'])
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'status': 'error'})

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'status': 'ok'})

def add_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8888'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Expose-Headers'] = 'Set-Cookie'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    return response

@loginmanager.user_loader
def load_user(user_id):
    print(user_id)
    return User.query.filter_by(id=user_id).first()

@app.before_request
def before_request():
    g.user = current_user

@app.route('/init')
@login_required
def init():
    views = View.query.filter_by(owner=g.user.id)
    lists = List.query.filter_by(owner=g.user.id)
    tags = Tag.query.filter_by(owner=g.user.id)
    contexts = Context.query.filter_by(owner=g.user.id)
    tasks = Task.query.filter_by(owner=g.user.id)
    return jsonify(
        views=[t.serialize() for t in views],
        lists=[t.serialize() for t in lists],
        tags=[t.serialize() for t in tags],
        contexts=[t.serialize() for t in contexts],
        tasks=[t.serialize() for t in tasks]
    )

app.after_request(add_cors_header)

api.decorators = [
    cors.crossdomain(
        origin='*',
        methods = ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        attach_to_all = True,
        automatic_options = True
    )
]

if __name__ == "__main__":
    app.debug = True
    app.config['BUNDLE_ERRORS'] = True
    db.create_all()
    app.run()
