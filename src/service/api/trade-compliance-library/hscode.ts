import { request } from '@/service/request';

/** 获取海关编码税则列表 */
export function fetchGetHscodeList(params?: Api.TradeComplianceLibrary.HscodeSearchParams) {
  return request<Api.TradeComplianceLibrary.HscodeList>({
    url: '/trade-compliance-library/hscode/list',
    method: 'get',
    params
  });
}
/** 新增海关编码税则 */
export function fetchCreateHscode(data: Api.TradeComplianceLibrary.HscodeOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/hscode',
    method: 'post',
    data
  });
}

/** 修改海关编码税则 */
export function fetchUpdateHscode(data: Api.TradeComplianceLibrary.HscodeOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/hscode',
    method: 'put',
    data
  });
}

/** 批量删除海关编码税则 */
export function fetchBatchDeleteHscode(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/trade-compliance-library/hscode/${ids.join(',')}`,
    method: 'delete'
  });
}
