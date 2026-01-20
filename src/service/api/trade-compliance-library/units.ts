import { request } from '@/service/request';

/** 获取计量单位列表 */
export function fetchGetUnitsList(params?: Api.TradeComplianceLibrary.UnitsSearchParams) {
  return request<Api.TradeComplianceLibrary.UnitsList>({
    url: '/trade-compliance-library/units/list',
    method: 'get',
    params
  });
}
/** 新增计量单位 */
export function fetchCreateUnits(data: Api.TradeComplianceLibrary.UnitsOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/units',
    method: 'post',
    data
  });
}

/** 修改计量单位 */
export function fetchUpdateUnits(data: Api.TradeComplianceLibrary.UnitsOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/units',
    method: 'put',
    data
  });
}

/** 批量删除计量单位 */
export function fetchBatchDeleteUnits(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/trade-compliance-library/units/${ids.join(',')}`,
    method: 'delete'
  });
}
