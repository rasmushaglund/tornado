from flask import jsonify
from flask_restful import Resource, reqparse

from util import db
from models.view import View


class Views(Resource):
    def get(self):
        try:
            views = View.query.all()
            return jsonify(views=[t.serialize() for t in views])

        except Exception as e:
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the view', location='json')
            parser.add_argument('filter', type=str, help='Filter', location='json')
            args = parser.parse_args()

            id = args['id']
            name = args['name']
            filter = args['filter']

            new_view = View(id, name, filter, False)
            db.session.add(new_view)
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
            view_to_delete = db.session.query(View).filter_by(id=id).first()
            db.session.delete(view_to_delete)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the view', location='json')
            parser.add_argument('filter', type=str, help='View filter', location='json')
            parser.add_argument('deleted', type=str, help='If the view is soft deleted', location='json')
            args = parser.parse_args()

            id = args['id']

            args = parser.parse_args()

            db.session.query(View).filter_by(id=id).update(
                dict(
                    name=args['name'],
                    filter=args['filter'],
                    deleted=args['deleted']
                )
            )

            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}
