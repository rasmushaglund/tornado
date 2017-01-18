from util import db


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(200))
    deleted = db.Column(db.Boolean())
    description = db.Column(db.String(1000))
    children = db.Column(db.String())
    owner = db.Column(db.Integer())

    def __init__(self, id, name, deleted, description, children, owner):
        self.id = id
        self.name = name
        self.deleted = deleted
        self.description = description,
        self.children = children
        self.owner = owner

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'deleted': self.deleted,
            'description': self.description,
            'children': self.children,
            'owner': self.owner
        }
