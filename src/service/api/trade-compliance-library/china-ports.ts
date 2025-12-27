import { request } from '@/service/request';

/** 获取口岸信息列表 */
export function fetchGetChinaPortsList(params?: Api.TradeComplianceLibrary.ChinaPortsSearchParams) {
  return request<Api.TradeComplianceLibrary.ChinaPortsList>({
    url: '/trade-compliance-library/chinaPorts/list',
    method: 'get',
    params
  });
}
/** 新增口岸信息 */
export function fetchCreateChinaPorts(data: Api.TradeComplianceLibrary.ChinaPortsOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/chinaPorts',
    method: 'post',
    data
  });
}

/** 修改口岸信息 */
export function fetchUpdateChinaPorts(data: Api.TradeComplianceLibrary.ChinaPortsOperateParams) {
  return request<boolean>({
    url: '/trade-compliance-library/chinaPorts',
    method: 'put',
    data
  });
}

/** 批量删除口岸信息 */
export function fetchBatchDeleteChinaPorts(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/trade-compliance-library/chinaPorts/${ids.join(',')}`,
    method: 'delete'
  });
}
