from flask import jsonify
from flask_restful import Resource, reqparse
from flask_login import login_required

from util import db, app
from models.list import List


class Lists(Resource):
    # method_decorators = {
    #    'get': [login_required],
    #    'post': [login_required],
    #    'delete': [login_required],
    #    'put': [login_required]
    #}

    def get(self):
        try:
            lists = List.query.all()
            return jsonify(lists=[t.serialize() for t in lists])

        except Exception as e:
            app.logger.error(e)
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the list', location='json')
            parser.add_argument('description', required=False, type=str, help='Description of the list', location='json')
            parser.add_argument('children', required=False, type=str, help='Sub lists', location='json')
            args = parser.parse_args()

            id = args['id']
            name = args['name']
            description = args['description']
            children = args['children']

            new_list = List(id, name, False, description, children)
            db.session.add(new_list)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            app.logger.error(e)
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
            app.logger.error(e)
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, required=False, help='Name of the list', location='json')
            parser.add_argument('deleted', type=str, required=False, help='If the list is soft deleted', location='json')
            parser.add_argument('description', required=False, type=str, help='Description of the list', location='json')
            args = parser.parse_args()

            id = args['id']

            values = {}

            if args['name'] is not None:
                values['name'] = args['name']
            if args['description'] is not None:
                values['description'] = args['description']
            if args['deleted'] is not None:
                values['deleted'] = args['deleted']

            db.session.query(List).filter_by(id=id).update(values)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            app.logger.error(e)
            return {'error': str(e)}
