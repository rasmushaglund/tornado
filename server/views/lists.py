from flask import jsonify
from flask_restful import Resource, reqparse

from util import db
from models.list import List


class Lists(Resource):
    def get(self):
        try:
            lists = List.query.all()
            return jsonify(lists=[t.serialize() for t in lists])

        except Exception as e:
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the list', location='json')
            args = parser.parse_args()

            id = args['id']
            name = args['name']

            new_list = List(id, name, False)
            db.session.add(new_list)
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
            list_to_delete = db.session.query(List).filter_by(id=id).first()
            db.session.delete(list_to_delete)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the list', location='json')
            parser.add_argument('deleted', type=str, help='If the list is soft deleted', location='json')
            args = parser.parse_args()

            id = args['id']

            args = parser.parse_args()

            db.session.query(List).filter_by(id=id).update(
                dict(
                    name=args['name'],
                    deleted=args['deleted']
                )
            )

            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}
