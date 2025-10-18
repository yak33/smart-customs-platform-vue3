import { request } from '@/service/request';

/** 获取货物单位编码列表 */
export function fetchGetUnitsList(params?: Api.Business.UnitsSearchParams) {
  return request<Api.Business.UnitsList>({
    url: '/business/units/list',
    method: 'get',
    params
  });
}

/** 新增货物单位编码 */
export function fetchCreateUnits(data: Api.Business.UnitsOperateParams) {
  return request<boolean>({
    url: '/business/units',
    method: 'post',
    data
  });
}

/** 修改货物单位编码 */
export function fetchUpdateUnits(data: Api.Business.UnitsOperateParams) {
  return request<boolean>({
    url: '/business/units',
    method: 'put',
    data
  });
}

/** 批量删除货物单位编码 */
export function fetchBatchDeleteUnits(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/units/${ids.join(',')}`,
    method: 'delete'
  });
}
