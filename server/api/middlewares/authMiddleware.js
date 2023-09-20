const express = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

async function authToken(req, res, next) {
    const bearerToken = req.headers.authorization;

    
    if (!bearerToken) {
        res.status(401).send({ message: "Not Authorized" })
        return
    }
    
    const token = bearerToken.split(" ")[1];

    try {
        const isValid = jwt.verify(token, process.env.JWT);
        console.log(isValid)
        const user = await prisma.user.findUnique({
            where: {
                id: isValid.id
            }
        })
        if (!user) {
            res.status(401).send({ message: "Not Authorized" })
            return
        }
        next()
        return

    } catch (error) {
        res.status(401).send({ message: "Not Authorized" })
        return
    }
}

module.exports = authToken;