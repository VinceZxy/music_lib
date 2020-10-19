from mechanism.dao import mechanism_dao
def get_mechanism(mechanism_id):
    mechanism = mechanism_dao.get_mechanism(mechanism_id)
    return mechanism
def add_mechanism(mechanism):
    mechanism = mechanism_dao.add_mechanism(mechanism)
    return mechanism
def update_mechanism(mechanism):
    mechanism = mechanism_dao.update_mechanism(mechanism)
    return mechanism
def delete_mechanism(id):
    mechanism_dao.delete_mechanism(id)
