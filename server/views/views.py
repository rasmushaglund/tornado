from flask import jsonify, g
from flask_restful import Resource, reqparse
from flask_login import login_required

from util import db, app
from models.view import View


class Views(Resource):
    decorators = [login_required]

    def get(self):
        try:
            views = View.query.filter_by(owner=g.user.id)
            return jsonify(views=[t.serialize() for t in views])

        except Exception as e:
            app.logger.error(e)
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the view', location='json')
            parser.add_argument('description', type=str, required=False, help='Description of the view', location='json')
            parser.add_argument('filter', type=str, help='Filter', location='json')
            args = parser.parse_args()

            id = args['id']
            name = args['name']
            filter = args['filter']
            description = args['description']

            new_view = View(id, name, filter, False, description, g.user.id)
            db.session.add(new_view)
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
            view_to_delete = db.session.query(View).filter_by(id=id, owner=g.user.id).first()
            db.session.delete(view_to_delete)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            app.logger.error(e)
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, required=False, help='Name of the view', location='json')
            parser.add_argument('description', type=str, required=False, help='Description of the view', location='json')
            parser.add_argument('filter', type=str, required=False, help='View filter', location='json')
            parser.add_argument('deleted', type=str, required=False, help='If the view is soft deleted', location='json')
            args = parser.parse_args()

            id = args['id']

            values = {}

            if args['name'] is not None:
                values['name'] = args['name']
            if args['description'] is not None:
                values['description'] = args['description']
            if args['deleted'] is not None:
                values['deleted'] = args['deleted']
            if args['filter'] is not None:
                values['filter'] = args['filter']

            db.session.query(View).filter_by(id=id, owner=g.user.id).update(values)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            app.logger.error(e)
            return {'error': str(e)}
