import { request } from '@/service/request';

/** 获取商品库列表 */
export function fetchGetPnList(params?: Api.Business.PnSearchParams) {
  return request<Api.Business.PnList>({
    url: '/business/goods/list',
    method: 'get',
    params
  });
}
/** 新增商品库 */
export function fetchCreatePn(data: Api.Business.PnOperateParams) {
  return request<boolean>({
    url: '/business/goods',
    method: 'post',
    data
  });
}

/** 修改商品库 */
export function fetchUpdatePn(data: Api.Business.PnOperateParams) {
  return request<boolean>({
    url: '/business/goods',
    method: 'put',
    data
  });
}

/** 批量删除商品库 */
export function fetchBatchDeletePn(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/goods/${ids.join(',')}`,
    method: 'delete'
  });
}
