const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
const authToken = require("./middlewares/authMiddleware")

router.get('/', async (req, res, next)=>{
    try {
        const allPosts = await prisma.post.findMany();
        res.send(allPosts)
    }catch(error){
        next(error)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const postId = await prisma.post.findFirst({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(postId)
    }catch(err){
        next(err)
    }
})

router.post('/', authToken, async (req, res, next)=>{
    try {
        const post = await prisma.post.create({
            data: req.body
        });
            res.send(post)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', authToken, async (req, res, next)=>{
    try {
        const post = await prisma.post.update({
            where:{
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', authToken, async (req, res, next)=>{
    try {
        const post = await prisma.post.delete({
            where:{
                id: Number(req.params.id)
            },
            
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})


module.exports = router;