const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req,res){
        res.render('auth/login')
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){
        const {name,email,password,confirmpassword} = req.body

        //password match validation

        if(password!= confirmpassword){
            //mensagem
            req.flash('message', 'As senhas não conferem')
            res.render('auth/register')
            return
        }
        //check if user exists
        const checkIfUserExists = await User.findOne({email: email})
        if(email === checkIfUserExists){
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')
            return
        }
        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = {
            name,
            email,
            password: hashedPassword,
        }
        try{
            await User.create(user)
            req.flash('message','Cadastro realizado com sucesso!')
            res.redirect('/')
        }
        catch(err){
            console.log(err)
        }

    }
}
