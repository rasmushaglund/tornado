from util import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.String(45), primary_key=True)
    lists = db.Column(db.String(100))
    contexts = db.Column(db.String(100))
    tags = db.Column(db.String(100))
    completed = db.Column(db.Boolean())
    name = db.Column(db.String(45))
    deleted = db.Column(db.Boolean())

    def __init__(self, id, lists, contexts, tags, completed, name, deleted):
        self.id = id
        self.lists = lists
        self.contexts = contexts
        self.tags = tags
        self.completed = completed
        self.name = name
        self.deleted = deleted

    def serialize(self):
        if self.contexts:
            contexts = self.contexts.split(',')
        else:
            contexts = None

        if self.lists:
            lists = self.lists.split(',')
        else:
            lists = None

        if self.tags:
            print self.tags
            tags = self.tags.split(',')
        else:
            tags = None

        print self.id
        print self.deleted
        print self.completed
        return {
            'id': self.id,
            'lists': lists,
            'contexts': contexts,
            'tags': tags,
            'completed': self.completed,
            'name': self.name,
            'deleted': self.deleted
        }
