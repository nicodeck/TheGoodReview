const { PrismaClient } = require("@prisma/client");
const md5 = require("md5");

const prisma = new PrismaClient();

async function main() {
  const jeanne = await prisma.user.upsert({
    where: { email: "jeanne@test.gg" },
    update: {},
    create: {
      email: "jeanne@test.gg",
      username: "jeanne33",
      password: md5("maison"),
    },
  });
  const camille = await prisma.user.upsert({
    where: { email: "camille@test.gg" },
    update: {},
    create: {
      email: "camille@test.gg",
      username: "camille27",
      password: md5("telephone"),
    },
  });
  console.log(jeanne, camille);

  const theWitcher = await prisma.game.upsert({
    where: { id: 1942 },
    update: {},
    create: {
      id: 1942,
    },
  });

  const theLastOfUs = await prisma.game.upsert({
    where: { id: 6036 },
    update: {},
    create: {
      id: 6036,
    },
  });

  console.log(theWitcher, theLastOfUs);

  const jeanneGradesTheWitcher = await prisma.grade.upsert({
    where: {
      gradeId: {
        authorId: jeanne.id,
        gameId: theWitcher.id,
      },
    },
    update: {},
    create: {
      authorId: jeanne.id,
      gameId: theWitcher.id,
      grade: 9,
    },
  });

  const camilleGradesTheLastOfUs = await prisma.grade.upsert({
    where: {
      gradeId: {
        authorId: camille.id,
        gameId: theLastOfUs.id,
      },
    },
    update: {},
    create: {
      authorId: camille.id,
      gameId: theLastOfUs.id,
      grade: 7,
    },
  });

  console.log(jeanneGradesTheWitcher, camilleGradesTheLastOfUs);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
