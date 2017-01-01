from util import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.String(45), primary_key=True)
    lists = db.relationship('List', backref='task')
    contexts = db.relationship('Context', backref='task')
    tags = db.relationship('Tag', backref='task')
    completed = db.Column(db.Boolean())
    name = db.Column(db.String(45))
    deleted = db.Column(db.Boolean())
    importance = db.Column(db.Integer())
    description = db.Column(db.String(1000))
    energy = db.Column(db.Integer())
    deadline = db.Column(db.Date())
    time = db.Column(db.String(10))

    def __init__(self, id, lists, contexts, tags, completed, name, deleted, importance, description, energy, deadline, time):
        self.id = id
        self.lists = lists
        self.contexts = contexts
        self.tags = tags
        self.completed = completed
        self.name = name
        self.deleted = deleted
        self.importance = importance
        self.deadline = deadline
        self.description = description
        self.time = time

    def serialize(self):

        print self.id
        print self.deleted
        print self.completed
        return {
            'id': self.id,
            'lists': [list.id for list in lists],
            'contexts': [context.id for context in contexts],
            'tags': [tag.id for tag in tags],
            'completed': self.completed,
            'name': self.name,
            'deleted': self.deleted,
            'importance': self.importance,
            'deadline': self.deadline,
            'description': self.description,
            'tile': self.time
        }
