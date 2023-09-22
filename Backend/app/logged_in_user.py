# Author: Carlos Paredes

class LoggedUser:
    def __init__(self, initial_id):
        if (initial_id):
            self.id = initial_id
        else:
            self.id = ""

    def set_id(self, new_id):
        self.id = new_id
    
    def get_id(self):
        return self.id