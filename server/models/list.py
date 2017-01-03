from util import db


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(200))
    deleted = db.Column(db.Boolean())
    description = db.Column(db.String(1000))

    def __init__(self, id, name, deleted, description):
        self.id = id
        self.name = name
        self.deleted = deleted
        self.description = description

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'deleted': self.deleted,
            'description': self.description
        }
