const { v4: uuid } = require('uuid')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql')

// 模拟数据
// 分类数据
const categories = [
  { id: '1', name: '电子产品' },
  { id: '2', name: '图书' },
  { id: '3', name: '衣服' },
]

// 产品数据
const products = [
  { id: '1', name: '手机', categoryId: '1' },
  { id: '2', name: '电脑', categoryId: '1' },
  { id: '3', name: '《红楼梦》', categoryId: '2' },
  { id: '4', name: '《三国演义》', categoryId: '2' },
  { id: '5', name: '衣服', categoryId: '3' },
  { id: '6', name: '鞋子', categoryId: '3' },
]

// 定义产品类别类型
const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(Product),
      resolve(parent, args) {
        return products.filter((product) => product.categoryId === parent.id)
      },
    },
  }),
})

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    category: {
      type: Category,
      resolve(parent, args) {
        return categories.find((category) => category.id === parent.categoryId)
      },
    },
  }),
})

// 定义根类型 query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getCategory: {
      type: Category, // 根据分类的 ID 查询单个分类
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull 表示 必填参数
      },
      resolve(parent, args) {
        return categories.find((category) => category.id === args.id)
      },
    },
    getCategories: {
      type: new GraphQLList(Category), // 查询所有分类
      resolve(parent, args) {
        return categories
      },
    },
    getProduct: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull 表示 必填参数
      },
      resolve(parent, args) {
        return products.find((product) => product.id === args.id)
      },
    },
    getProducts: {
      type: new GraphQLList(Product),
      resolve(parent, args) {
        return products
      },
    },
    getProductsByCategory: {
      type: new GraphQLList(Product),
      args: {
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return products.filter(
          (product) => product.categoryId === args.categoryId
        )
      },
    },
  },
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    // 添加分类
    addCategory: {
      type: Category,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const category = {
          id: uuid(), // 生成唯一 ID
          name: args.name,
        }
        categories.push(category)
        return category
      },
    },

    // 添加产品
    addProduct: {
      type: Product,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const product = {
          id: uuid(), // 生成唯一 ID
          name: args.name,
          categoryId: args.categoryId,
        }
        products.push(product)
        return product
      },
    },
  },
})

// 定义 schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
