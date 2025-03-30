import { gql } from '@apollo/client'

// 获取分类
export const GET_CETGORIES = gql`
  {
    categories: getCategories {
      id
      name
    }
  }
`

// 获取分类下的商品
export const GET_PRODUCT_BY_CATEGORY = gql`
  query ($categoryId: String!) {
    products: getProductsByCategory(categoryId: $categoryId) {
      id
      name
    }
  }
`

// 增加商品
export const ADD_PRODUCT = gql`
  mutation ($categoryId: String!, $name: String!) {
    product: addProduct(categoryId: $categoryId, name: $name) {
      id
      name
    }
  }
`
