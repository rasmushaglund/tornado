from util import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.String(45), primary_key=True)
    lists = db.Column(db.Text())
    contexts = db.Column(db.Text())
    tags = db.Column(db.Text())
    completed = db.Column(db.Boolean())
    name = db.Column(db.String(200))
    deleted = db.Column(db.Boolean())
    importance = db.Column(db.Integer())
    description = db.Column(db.String(1000))
    energy = db.Column(db.Integer())
    deadline = db.Column(db.Date())
    time = db.Column(db.String(20))

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
        self.time = time,
        self.energy = energy

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
            tags = self.tags.split(',')
        else:
            tags = None

        return {
            'id': self.id,
            'lists': lists,
            'contexts': contexts,
            'tags': tags,
            'completed': self.completed,
            'name': self.name,
            'deleted': self.deleted,
            'importance': self.importance,
            'deadline': self.deadline,
            'description': self.description,
            'time': self.time,
            'energy': self.energy
        }
