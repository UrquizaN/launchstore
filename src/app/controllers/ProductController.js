const Category = require('../models/Category')
const Product = require('../models/Product')

const { formatCurrency } = require('../../lib/utils')

module.exports = {
    create(req, res){
        Category.all().then(function(results){
            const categories = results.rows

            return res.render('products/create.njk', { categories })
        }).catch(function(err){
            throw new Error(err)
        })
    },
    async post(req, res){
        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        return res.redirect(`products/${productId}`)
    },
    async edit(req, res){
        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if(!product) return res.send('Product Not Found!')

        product.old_price = formatCurrency(product.old_price)
        product.price = formatCurrency(product.price)

        results = await Category.all()
        const categories = results.rows

        return res.render('products/edit.njk', { product, categories })
    },
    async put(req, res){
        req.body.price = req.body.price.replace(/\D/g, '')
        
        if(req.body.old_price != req.body.price){
            const old_price = await Product.find(req.body.id)

            req.body.old_price = old_price.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`products/${req.body.id}/edit`)
    }
}