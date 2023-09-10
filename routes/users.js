var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async function (req, res, next) {
	const allUsers = await prisma.user.findMany();

	res.send(allUsers);
});

router.post('/add', async (req, res, next) => {
	// console.log('body', req.body);
	const { name, email } = req.body;
	await prisma.user.create({
		data: {
			name,
			email,
			Post: {
				create: { title: 'Hello World' },
			},
			Profile: {
				create: { bio: 'I like turtles' },
			},
		},
	});

	const allUsers = await prisma.user.findMany();
	// console.dir(allUsers, { depth: null });
	res.send(allUsers);
});

router.get('/posts/:id', async function (req, res, next) {
	const { id } = req.params;
	const userPosts = await prisma.post.findMany({
		where: { authorId: parseInt(id) },
	});
	res.send(userPosts);
});

module.exports = router;
