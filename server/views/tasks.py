from flask import jsonify
from flask_restful import Resource, reqparse

from util import db, app
from models.task import Task


class Tasks(Resource):
    def get(self):
        try:
            tasks = Task.query.all()
            return jsonify(tasks=[t.serialize() for t in tasks])

        except Exception as e:
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the task', location='json')
            parser.add_argument('lists', type=list, help='Task associated lists', location='json')
            parser.add_argument('tags', type=list, help='Task tags', location='json')
            parser.add_argument('contexts', type=list, help='Task contexts', location='json')
            args = parser.parse_args()

            print args

            id = args['id']
            name = args['name']
            lists = ','.join(str(x) for x in args['lists'])
            tags = ','.join(str(x) for x in args['tags'])
            contexts = ','.join(str(x) for x in args['contexts'])

            new_task = Task(id, lists, contexts, tags, False, name, False)
            db.session.add(new_task)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}

    def delete(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            args = parser.parse_args()

            print args

            id = args['id']
            task_to_delete = db.session.query(Task).filter_by(id=id).first()
            db.session.delete(task_to_delete)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the task', location='json')
            parser.add_argument('completed', type=bool, help='If the task is completed', location='json')
            parser.add_argument('deleted', type=bool, help='If the task is soft deleted', location='json')
            parser.add_argument('lists', type=list, help='Task associated lists', location='json')
            parser.add_argument('tags', type=list, help='Task tags', location='json')
            parser.add_argument('contexts', type=list, help='Task contexts', location='json')
            args = parser.parse_args()

            print args

            id = args['id']

            args = parser.parse_args()

            values = {}

            if args['name'] is not None:
                values['name'] = args['name']
            if args['completed'] is not None:
                values['completed'] = args['completed']
            if args['deleted'] is not None:
                values['deleted'] = args['deleted']
            if args['lists'] is not None:
                values['lists'] = ','.join(str(x) for x in args['lists']),
            if args['tags'] is not None:
                values['tags'] = ','.join(str(x) for x in args['tags']),
            if args['contexts'] is not None:
                values['contexts'] = ','.join(str(x) for x in args['contexts'])
            print values
            db.session.query(Task).filter_by(id=id).update(values)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            app.logger.error(e)
            return {'error': str(e)}
