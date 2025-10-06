import { request } from '@/service/request';

/** 获取港口列表 */
export function fetchGetCityportsList(params?: Api.Business.CityportsSearchParams) {
  return request<Api.Business.CityportsList>({
    url: '/business/cityports/list',
    method: 'get',
    params
  });
}

/** 新增港口 */
export function fetchCreateCityports(data: Api.Business.CityportsOperateParams) {
  return request<boolean>({
    url: '/business/cityports',
    method: 'post',
    data
  });
}

/** 修改港口 */
export function fetchUpdateCityports(data: Api.Business.CityportsOperateParams) {
  return request<boolean>({
    url: '/business/cityports',
    method: 'put',
    data
  });
}

/** 批量删除港口 */
export function fetchBatchDeleteCityports(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/cityports/${ids.join(',')}`,
    method: 'delete'
  });
}
