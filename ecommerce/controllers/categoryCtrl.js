const Category = require('../models/categoryModel')


const categoryCtrl = {
    getCategories: async (req, res)=>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory : async ( req, res)=>{
        try {
            // if user have role = 1 ----> admin user
            // only admin can create, delete, and update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json ({msg: " This category already exists."})

            const newcategory = new Category({name})

            await newcategory.save()
            res.json ({msg: "Create a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory : async ( req, res)=>{
        try {
            await Category.findOneAndDelete(req.params.id)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory : async ( req, res)=>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl