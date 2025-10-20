import { request } from '@/service/request';

/** 获取商品库列表 */
export function fetchGetGoodsList(params?: Api.Business.GoodsSearchParams) {
  return request<Api.Business.GoodsList>({
    url: '/business/goods/list',
    method: 'get',
    params
  });
}

/** 新增商品库 */
export function fetchCreateGoods(data: Api.Business.GoodsOperateParams) {
  return request<boolean>({
    url: '/business/goods',
    method: 'post',
    data
  });
}

/** 修改商品库 */
export function fetchUpdateGoods(data: Api.Business.GoodsOperateParams) {
  return request<boolean>({
    url: '/business/goods',
    method: 'put',
    data
  });
}

/** 批量删除商品库 */
export function fetchBatchDeleteGoods(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/goods/${ids.join(',')}`,
    method: 'delete'
  });
}
