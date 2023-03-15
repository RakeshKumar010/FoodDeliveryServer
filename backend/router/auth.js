const express = require('express');
// const { findOne } = require('../model/userSchema');
const Router = express.Router();
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')


Router.get('/', (req, res) => {
    res.send('Router is home')
})
Router.get('/about', (req, res) => {
    console.log('Router is ab')

    res.send('Router is about')
})
Router.get('/contect', (req, res) => {
    res.send('Router is contect')
})
Router.post('/signup', async (req, res) => {
    const { name, email, phone, password, cpassword, work } = req.body;
    let data = await User.findOne({ email })
    if(req.body.password != req.body.cpassword){
        res.status(400).send({ 'error': 'password not match ' })

    }else if (data) {
        console.log({ 'error': 'email already exist' })
        res.status(402).send({ 'error': 'email already exist' })

    } else {
        let result = new User(req.body);
        result = await result.save()
        res.send(result)

    }
 
      
})
Router.post('/signin', async(req, res) => {
    if(req.body.email && req.body.password){
        let result = await User.findOne({email:req.body.email})
        let isMatch = await bcrypt.compare(req.body.password, result.password)
        if(isMatch){
            res.send(result)
        }else{
            res.status(404).json({'error':'not match'})
        }
    }else{
        res.send({'error':'fill both field'})
    }
   

})

module.exports = Router;