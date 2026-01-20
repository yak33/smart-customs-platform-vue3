import { request } from '@/service/request';

/** 获取币制列表 */
export function fetchGetCurrenciesList(params?: Api.TradeComplianceLibrary.CurrenciesSearchParams) {
  return request<Api.TradeComplianceLibrary.CurrenciesList>({
    url: '/trade-compliance-library/currencies/list',
    method: 'get',
    params
  });
}
/** 新增币制 */
export function fetchCreateCurrencies(data: Api.TradeComplianceLibrary.CurrenciesOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/currencies',
    method: 'post',
    data
  });
}

/** 修改币制 */
export function fetchUpdateCurrencies(data: Api.TradeComplianceLibrary.CurrenciesOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/currencies',
    method: 'put',
    data
  });
}

/** 批量删除币制 */
export function fetchBatchDeleteCurrencies(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/trade-compliance-library/currencies/${ids.join(',')}`,
    method: 'delete'
  });
}
