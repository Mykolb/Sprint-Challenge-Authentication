const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add
};


function find() {
    return db('users')
    .select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users')
    .where(filter);
}

function add(users) {
    return db('users')
    .insert(users)
}

function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }