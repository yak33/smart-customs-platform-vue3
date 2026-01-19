import { request } from '@/service/request';

/** 获取国家列表 */
export function fetchGetCountriesList(params?: Api.TradeComplianceLibrary.CountriesSearchParams) {
  return request<Api.TradeComplianceLibrary.CountriesList>({
    url: '/trade-compliance-library/countries/list',
    method: 'get',
    params
  });
}
/** 新增国家 */
export function fetchCreateCountries(data: Api.TradeComplianceLibrary.CountriesOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/countries',
    method: 'post',
    data
  });
}

/** 修改国家 */
export function fetchUpdateCountries(data: Api.TradeComplianceLibrary.CountriesOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/countries',
    method: 'put',
    data
  });
}

/** 批量删除国家 */
export function fetchBatchDeleteCountries(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/trade-compliance-library/countries/${ids.join(',')}`,
    method: 'delete'
  });
}
