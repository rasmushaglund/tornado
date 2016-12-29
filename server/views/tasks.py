from flask import jsonify
from flask_restful import Resource, reqparse

from util import db
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
            parser.add_argument('deleted', type=str, help='If the task is soft deleted', location='json')
            parser.add_argument('lists', type=list, help='Task associated lists', location='json')
            parser.add_argument('tags', type=list, help='Task tags', location='json')
            parser.add_argument('contexts', type=list, help='Task contexts', location='json')
            args = parser.parse_args()

            id = args['id']

            args = parser.parse_args()

            db.session.query(Task).filter_by(id=id).update(
                dict(
                    name=args['name'],
                    deleted=args['deleted'],
                    lists=','.join(str(x) for x in args['lists']),
                    tags=','.join(str(x) for x in args['tags']),
                    contexts=','.join(str(x) for x in args['contexts'])
                )
            )

            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}
