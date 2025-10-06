import { request } from '@/service/request';

/** 获取币制列表 */
export function fetchGetCurrenciesList(params?: Api.Business.CurrenciesSearchParams) {
  return request<Api.Business.CurrenciesList>({
    url: '/business/currencies/list',
    method: 'get',
    params
  });
}

/** 新增币制 */
export function fetchCreateCurrencies(data: Api.Business.CurrenciesOperateParams) {
  return request<boolean>({
    url: '/business/currencies',
    method: 'post',
    data
  });
}

/** 修改币制 */
export function fetchUpdateCurrencies(data: Api.Business.CurrenciesOperateParams) {
  return request<boolean>({
    url: '/business/currencies',
    method: 'put',
    data
  });
}

/** 批量删除币制 */
export function fetchBatchDeleteCurrencies(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/currencies/${ids.join(',')}`,
    method: 'delete'
  });
}
