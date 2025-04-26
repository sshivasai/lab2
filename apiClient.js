/*eslint-disable*/

const fetch = require('node-fetch');

/**
 * Fetch a list of users.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return await response.json();
}

/**
 * Fetch a single user by ID.
 * @param {number} id - The ID of the user to fetch.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
async function fetchUserById(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return await response.json();
}

/**
 * Create a new user.
 * @param {Object} user - The user data to create.
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 */
async function createUser(user) {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}

/**
 * Update a user by ID.
 * @param {number} id - The ID of the user to update.
 * @param {Object} user - The user data to update.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 */
async function updateUser(id, user) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}

/**
 * Delete a user by ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<Response>} A promise that resolves to the fetch response.
 */
async function deleteUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  });
  return response;
}

module.exports = {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
};
