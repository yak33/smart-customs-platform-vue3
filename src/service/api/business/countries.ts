import { request } from '@/service/request';

/** 获取国家列表 */
export function fetchGetCountriesList(params?: Api.Business.CountriesSearchParams) {
  return request<Api.Business.CountriesList>({
    url: '/business/countries/list',
    method: 'get',
    params
  });
}

/** 新增国家 */
export function fetchCreateCountries(data: Api.Business.CountriesOperateParams) {
  return request<boolean>({
    url: '/business/countries',
    method: 'post',
    data
  });
}

/** 修改国家 */
export function fetchUpdateCountries(data: Api.Business.CountriesOperateParams) {
  return request<boolean>({
    url: '/business/countries',
    method: 'put',
    data
  });
}

/** 批量删除国家 */
export function fetchBatchDeleteCountries(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/countries/${ids.join(',')}`,
    method: 'delete'
  });
}
