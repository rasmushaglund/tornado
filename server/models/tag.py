from util import db


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(200))
    deleted = db.Column(db.Boolean())
    owner = db.Column(db.Integer())

    def __init__(self, id, name, deleted, owner):
        self.id = id
        self.name = name
        self.deleted = deleted
        self.owner = owner

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'deleted': self.deleted,
            'owner': self.owner
        }
