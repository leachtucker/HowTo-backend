const db = require('../../data/dbConfig');

function findById(post_id) {
    return db('posts').where({ post_id }).first();
}

function getPosts () {
    return db('posts');
}

async function insertPost (postData) {
    const [ newPostId ] = await db('posts').insert(postData).returning('post_id');

    if(!newPostId) {
        return Promise.reject(null);
    }

    const newPost = await findById(newPostId);

    return Promise.resolve(newPost);
}

async function deletePost (id) {
    const delRecords = await db('posts').where('post_id', id).delete();

    // Check that we deleted some records. If not, return null
    if (!delRecords || delRecords <= 0) {
        return Promise.resolve(null);
    }

    return Promise.resolve(true);
}

async function updatePost (id, changes) {
    const changedRecords = await db('posts').where('post_id', id).update(changes);

    if (!changedRecords || changedRecords <= 0) {
        return Promise.resolve(null);
    }

    const updatedPost = await findById(id);

    return Promise.resolve(updatedPost);
}

// NEEDS TESTED //
function findPostsByUserId (id) {
    return db('posts').where('user_id', id);
}

function findStepsByPostId (id) {
    return db('steps').where('post_id', id);
}

async function insertStepByPostId (id, stepData) {
    const [ newStepId ] = await db('steps').insert({ ...stepData, post_id: id }).returning('step_id');

    if (!newStepId) {
        return Promise.resolve(null);
    }

    const newStep = await db('steps').where('step_id', newStepId);

    return Promise.resolve(newStep);
}

module.exports = {
    findById,
    getPosts,
    insertPost,
    deletePost,
    updatePost,
    findPostsByUserId,
    findStepsByPostId,
    insertStepByPostId
}