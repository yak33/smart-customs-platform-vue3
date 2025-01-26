import { request } from '@/service/request';

// =============== Product Begin ===============

// 获取商品列表
export function fetchGetProductList(params: Api.GoodsManage.ProductSearchParams) {
  return request<Api.GoodsManage.ProductList>({
    url: '/product/list',
    method: 'GET',
    params
  });
}

// 删除商品
export function fetchDeleteProduct(params: { ids: string[] }) {
  return request({
    url: '/product/delete',
    method: 'POST',
    data: params
  });
}

/** get product detail */
export function fetchGetProductDetail(id: string) {
  return request<Api.GoodsManage.Product>({
    url: `/product/${id}`,
    method: 'GET'
  });
}

/** add product */
export function fetchAddProduct(data: Api.GoodsManage.ProductEdit) {
  return request<boolean>({
    url: '/product/',
    method: 'POST',
    data
  });
}

/** update product */
export function fetchUpdateProduct(data: Api.GoodsManage.ProductEdit) {
  return request<boolean>({
    url: '/product/',
    method: 'PUT',
    data
  });
}

// =============== Product End  ===============
