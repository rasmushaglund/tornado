from util import db


class View(db.Model):
    __tablename__ = "views"

    id = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(100))
    filter = db.Column(db.String(100))
    deleted = db.Column(db.Boolean())

    def __init__(self, id, name, filter, deleted):
        self.id = id
        self.name = name
        self.filter = filter
        self.deleted = deleted

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'filter': self.filter,
            'deleted': self.deleted
        }
