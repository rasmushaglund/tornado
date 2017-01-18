from flask import jsonify, g
from flask_restful import Resource, reqparse
from flask_login import login_required

from util import db
from models.context import Context


class Contexts(Resource):
    decorators = [login_required]

    def get(self):
        try:
            contexts = Context.query.filter_by(owner=g.user.id)
            return jsonify(contexts=[t.serialize() for t in contexts])

        except Exception as e:
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the context', location='json')
            args = parser.parse_args()

            id = args['id']
            name = args['name']

            new_context = Context(id, name, False, g.user.id)
            db.session.add(new_context)
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
            context_to_delete = db.session.query(Context).filter_by(id=id, owner=g.user.id).first()
            db.session.delete(context_to_delete)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', required=False, type=str, help='Name of the context', location='json')
            parser.add_argument('deleted', required=False, type=str, help='If the context is soft deleted', location='json')
            args = parser.parse_args()

            id = args['id']

            values = {}

            if args['name'] is not None:
                values['name'] = args['name']
            if args['deleted'] is not None:
                values['deleted'] = args['deleted']

            db.session.query(Context).filter_by(id=id, owner=g.user.id).update(values)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}
