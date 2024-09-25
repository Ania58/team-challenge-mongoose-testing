const app = require('./index'); 
const request = require('supertest');

const mongoose = require('mongoose');



describe('POST /create', () => {
    it('should create a new post when valid data is provided', async () => {
        const post = await request(app)
            .post('/create')
            .send({
                title: 'My First Post',
                content: 'This is the content of my first post.'
            });
        expect(post.statusCode).toEqual(201);
        expect(post.body).toHaveProperty('_id');
        expect(post.body.title).toEqual('My First Post');
    });

    it('should return 400 if title is missing', async () => {
        const post = await request(app)
            .post('/create')
            .send({
                content: 'This is the content of my post without a title.'
            });
        expect(post.statusCode).toEqual(400);
        expect(post.body.message).toEqual('Title is required');
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Close the database connection
});