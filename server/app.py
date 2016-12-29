from util import db, app, api
from views.tasks import Tasks
from views.views import Views
from views.lists import Lists
from views.contexts import Contexts


api.add_resource(Tasks, '/tasks')
api.add_resource(Contexts, '/contexts')
api.add_resource(Lists, '/lists')
api.add_resource(Views, '/views')


@app.route("/")
def main():
    return "Welcome!"

if __name__ == "__main__":
    app.debug = True
    db.create_all()
    app.run()
