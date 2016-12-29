from util import db, app, api
from views.tasks import Tasks


api.add_resource(Tasks, '/tasks')
# api.add_resource(Contexts, '/contexts')
# api.add_resource(Tasks, '/tasks')
# api.add_resource(Tasks, '/tasks')
# api.add_resource(Tasks, '/tasks')


@app.route("/")
def main():
    return "Welcome!"

if __name__ == "__main__":
    app.debug = True
    db.create_all()
    app.run()
