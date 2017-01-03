from util import db


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(200))
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
