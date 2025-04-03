import { useLazyQuery, useMutation } from '@apollo/client'
import {
  ADD_PRODUCT,
  GET_CETGORIES,
  GET_PRODUCT_BY_CATEGORY,
} from '../../apollo/gal'
import { useEffect } from 'react'
import { Button, Card, Form, Input, List, message, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useForm } from 'antd/es/form/Form'

interface Product {
  id: string
  name: string
  category: Category
}

interface Category {
  id: string
  name: string
  products: Omit<Product, 'category'>[]
}

interface GetProductsByCategoryVariables {
  categoryId: string
}

interface AddProductVariables {
  categoryId: string
  name: string
}

function Shop() {
  const [form1] = useForm()
  const [form2] = useForm()
  const [getCetgories, { data: cetgoriesData }] = useLazyQuery<{
    categories: Category[]
  }>(GET_CETGORIES, {
    fetchPolicy: 'network-only',
  })

  const [
    getProductsByCategory,
    { loading: productsLoading, data: productsData },
  ] = useLazyQuery<
    {
      products: Omit<Product, 'category'>[]
    },
    GetProductsByCategoryVariables
  >(GET_PRODUCT_BY_CATEGORY, {
    fetchPolicy: 'network-only',
  })

  const [addProduct, { loading: addProductLoading }] = useMutation<
    {
      product: Omit<Product, 'category'>
    },
    AddProductVariables
  >(ADD_PRODUCT, {
    fetchPolicy: 'network-only',
    onCompleted: () => {
      getProductsByCategory({
        variables: { categoryId: '1' },
      })
      form2.resetFields()
      message.success('商品添加成功')
    },
  })

  useEffect(() => {
    getCetgories()
    getProductsByCategory({
      variables: { categoryId: '1' },
    })
  }, [])

  return (
    <Card className="shadow-md">
      <Form form={form1} initialValues={{ categoryId: '1' }}>
        <FormItem name="categoryId">
          <Select
            options={cetgoriesData?.categories?.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            onChange={(value) => {
              getProductsByCategory({
                variables: { categoryId: value },
              })
            }}
          />
        </FormItem>
      </Form>

      <List
        bordered
        loading={productsLoading}
        dataSource={productsData?.products}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
        footer={
          <Form
            form={form2}
            layout="inline"
            onFinish={(values) => {
              const { categoryId } = form1.getFieldsValue()
              addProduct({
                variables: {
                  categoryId,
                  name: values.name,
                },
              })
            }}
          >
            <FormItem name="name" className="flex-1!">
              <Input />
            </FormItem>
            <FormItem noStyle>
              <Button
                type="primary"
                htmlType="submit"
                loading={addProductLoading}
              >
                ADD
              </Button>
            </FormItem>
          </Form>
        }
      />
    </Card>
  )
}

export default Shop
