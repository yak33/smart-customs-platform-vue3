import { request } from '@/service/request';

/** 获取关区口岸列表 */
export function fetchGetCustomsPortsList(params?: Api.Business.CustomsPortsSearchParams) {
  return request<Api.Business.CustomsPortsList>({
    url: '/business/customsPorts/list',
    method: 'get',
    params
  });
}

/** 新增关区口岸 */
export function fetchCreateCustomsPorts(data: Api.Business.CustomsPortsOperateParams) {
  return request<boolean>({
    url: '/business/customsPorts',
    method: 'post',
    data
  });
}

/** 修改关区口岸 */
export function fetchUpdateCustomsPorts(data: Api.Business.CustomsPortsOperateParams) {
  return request<boolean>({
    url: '/business/customsPorts',
    method: 'put',
    data
  });
}

/** 批量删除关区口岸 */
export function fetchBatchDeleteCustomsPorts(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/customsPorts/${ids.join(',')}`,
    method: 'delete'
  });
}
