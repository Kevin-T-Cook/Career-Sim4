const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")

const users = [
    {username: "kevin", password: "test123"},
    {username: "tom", password: "test123"},
    {username: "dave", password: "test123"},
    {username: "bob", password: "test123"},
    {username: "james", password: "test123"},
]

const posts = [
    {title: 'Hello Darkness', content: 'My Old Friend', userId: 1},
    {title: 'Its Me', content: 'Im the problem, its me', userId: 2},
    {title: 'Who let the dogs out', content: 'Who, who, who', userId: 3},
    {title: 'Biz Markie', content: 'Oh, hes just a friend', userId: 4},
    {title: 'Ll cool J Mama', content: 'Said Knock you Out...sorry', userId: 5},
]

async function main(){
    const salt_rounds = 5;
    
    await Promise.all(
        users.map(async (user) => {
            const existingUser = await prisma.user.findUnique({
              where: { username: user.username },
            });
      
            if (!existingUser) {
              const hashedPassword = await bcrypt.hash(user.password, salt_Rounds);
              return prisma.user.create({
                data: {
                  username: user.username,
                  password: hashedPassword,
                },
              });
            };
          }),

        posts.map(async (post)=>{
            return prisma.post.create({
                data:{
                    title: post.title,
                    content: post.content,
                    userId: post.userId,
                }
            })
        })
    )
}

main()
.then(async ()=>{
    await prisma.$disconnect()
}) 
.catch(async (error)=>{
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})

