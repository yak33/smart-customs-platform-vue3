import { request } from '@/service/request';

/** 获取港口列表 */
export function fetchGetCityportsList(params?: Api.TradeComplianceLibrary.CityportsSearchParams) {
  return request<Api.TradeComplianceLibrary.CityportsList>({
    url: '/trade-compliance-library/cityports/list',
    method: 'get',
    params
  });
}
/** 新增港口 */
export function fetchCreateCityports(data: Api.TradeComplianceLibrary.CityportsOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/cityports',
    method: 'post',
    data
  });
}

/** 修改港口 */
export function fetchUpdateCityports(data: Api.TradeComplianceLibrary.CityportsOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/cityports',
    method: 'put',
    data
  });
}

/** 批量删除港口 */
export function fetchBatchDeleteCityports(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/trade-compliance-library/cityports/${ids.join(',')}`,
    method: 'delete'
  });
}
