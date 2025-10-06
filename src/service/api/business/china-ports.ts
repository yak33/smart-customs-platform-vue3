import { request } from '@/service/request';

/** 获取口岸信息列表 */
export function fetchGetChinaPortsList(params?: Api.Business.ChinaPortsSearchParams) {
  return request<Api.Business.ChinaPortsList>({
    url: '/business/chinaPorts/list',
    method: 'get',
    params
  });
}

/** 新增口岸信息 */
export function fetchCreateChinaPorts(data: Api.Business.ChinaPortsOperateParams) {
  return request<boolean>({
    url: '/business/chinaPorts',
    method: 'post',
    data
  });
}

/** 修改口岸信息 */
export function fetchUpdateChinaPorts(data: Api.Business.ChinaPortsOperateParams) {
  return request<boolean>({
    url: '/business/chinaPorts',
    method: 'put',
    data
  });
}

/** 批量删除口岸信息 */
export function fetchBatchDeleteChinaPorts(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/chinaPorts/${ids.join(',')}`,
    method: 'delete'
  });
}
