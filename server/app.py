from util import db, app, api, bcrypt, loginmanager
from flask import jsonify, request, session, g
from flask_restful.utils import cors
from flask_login import login_required, login_user, logout_user, current_user

from views.tasks import Tasks
from views.views import Views
from views.lists import Lists
from views.contexts import Contexts
from views.tags import Tags

from models.user import User

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
    json_data = request.json
    user = User.query.filter_by(email=json_data['email']).first_or_404()
    if user and bcrypt.check_password_hash(user.password, json_data['password']):
        login_user(user)
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'status': 'error'})

def logout():
    logout_user()

@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    return jsonify({'status': 'ok'})

def add_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    return response

@loginmanager.user_loader
def load_user(user_id):
    print(user_id)
    return User.query.filter_by(id=user_id).first()

@app.before_request
def before_request():
    g.user = current_user

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
