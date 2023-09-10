const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

async function main() {
	const allUsers = await prisma.user.findMany();
	console.log(allUsers);
}
