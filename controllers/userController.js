import User from "../models/user.js"
import bcrypt from "bcrypt"

export async function createUser(req, res) {
    try {
    const user = await User.findOne({email : req.body.email})
    if(user != null) {
        res.status(400).json({ message : "User already exists" })
        return
    }
    const passwordHash = bcrypt.hashSync(req.body.password, 10)

    const newUser = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : passwordHash,
    })
    await newUser.save()
    res.status(201).json({ message : "User created successfully" })


    } catch (err) {
        res.status(500).json({ message : err.message })
    }
}

export async function loginUser(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

        if(email == null || password == null) {
            res.status(400).json({ message : "Email and password are required" })
            return
        }
        const user = await User.findOne({email : email})

        if(user == null) {
            res.status(400).json({ message : "User not found" })
            return
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        
        if(isPasswordValid) {

            res.status(200).json({ message : "Login successful" })

        } else {

            res.status(400).json({ message : "Invalid password" })
            
        }
    }catch (err) {
        res.status(500).json({ message : err.message })
    }  
}