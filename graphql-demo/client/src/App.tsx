import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import Shop from './components/Shop'
import Layout from './components/Layout'

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Shop />
      </Layout>
    </ApolloProvider>
  )
}

export default App
