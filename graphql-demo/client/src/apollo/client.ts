import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// 1. 配置 HTTP 连接
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // 替换为你的 GraphQL 端点
})

// 2. 可选：设置请求头（如认证）
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// 3. 创建 Apollo Client 实例
const client = new ApolloClient({
  link: authLink.concat(httpLink), // 链式组合中间件
  cache: new InMemoryCache(),
})

export default client
