// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// have to determine what needs: onDelete: 'CASCADE',

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // foreign key comes from Product when .belongsTo
  onDelete: 'CASCADE',
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // foreign key comes from Product when .hasMany
  onDelete: 'CASCADE',
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { // many to many relationship, ProductTag used as a junction table containing the foreign keys
  through: {
    model: ProductTag,
    unique: false
  }
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { // many to many relationship, ProductTag used as a junction table containing the foreign keys
  through: {
    model: ProductTag,
    unique: false
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
