async function request(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

const host = 'http://localhost:3030/jsonstore/collections/books';

async function getBooks() {
    return Object
        .entries(await request(host))
        .map(([id, book]) => Object.assign(book, { _id: id }));
}

async function getBookById(id) {
    return await request(`${host}/${id}`);
}

async function createBook(book) {
    return await request(host, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
}

async function editBook(id, book) {
    return await request(`${host}/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book })
    });
}

async function deleteBook(id) {
    return await request(`${host}/${id}`, {
        method: 'delete',
    });
}

export {
    getBooks,
    getBookById,
    createBook,
    editBook,
    deleteBook
};