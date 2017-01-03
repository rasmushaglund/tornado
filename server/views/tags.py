from flask import jsonify
from flask_restful import Resource, reqparse

from util import db
from models.tag import Tag


class Tags(Resource):
    def get(self):
        try:
            tags = Tag.query.all()
            return jsonify(tags=[t.serialize() for t in tags])

        except Exception as e:
            return {'error': str(e)}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', type=str, help='Name of the tag', location='json')
            args = parser.parse_args()

            id = args['id']
            name = args['name']

            new_tag = Tag(id, name, False)
            db.session.add(new_tag)
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
            tag_to_delete = db.session.query(Tag).filter_by(id=id).first()
            db.session.delete(tag_to_delete)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}

    def put(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str, help='Guid', location='json')
            parser.add_argument('name', required=False, type=str, help='Name of the tag', location='json')
            parser.add_argument('deleted', required=False, type=str, help='If the tag is soft deleted', location='json')
            args = parser.parse_args()

            id = args['id']

            if args['name'] is not None:
                values['name'] = args['name']
            if args['deleted'] is not None:
                values['deleted'] = args['deleted']

            db.session.query(Tag).filter_by(id=id).update(values)
            db.session.commit()

            return {'status': 'ok'}

        except Exception as e:
            return {'error': str(e)}
