from util import db, app, api
from flask_restful.utils import cors
from views.tasks import Tasks
from views.views import Views
from views.lists import Lists
from views.contexts import Contexts
from views.tags import Tags


api.add_resource(Tasks, '/tasks')
api.add_resource(Contexts, '/contexts')
api.add_resource(Tags, '/tags')
api.add_resource(Lists, '/lists')
api.add_resource(Views, '/views')


@app.route("/")
def main():
    return "Welcome!"


def add_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    return response

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
    db.create_all()
    app.run()
