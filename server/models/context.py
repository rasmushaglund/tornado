from util import db


class Context(db.Model):
    __tablename__ = "contexts"

    id = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(100))
    deleted = db.Column(db.Boolean())

    def __init__(self, id, name, deleted):
        self.id = id
        self.name = name
        self.deleted = deleted

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'deleted': self.deleted
        }
