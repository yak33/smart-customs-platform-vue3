import { request } from '@/service/request';

/** 获取企业海关备案信息列表 */
export function fetchGetEnterpriseList(params?: Api.Business.EnterpriseSearchParams) {
  return request<Api.Business.EnterpriseList>({
    url: '/business/enterprise/list',
    method: 'get',
    params
  });
}
/** 新增企业海关备案信息 */
export function fetchCreateEnterprise(data: Api.Business.EnterpriseOperateParams) {
  return request<boolean>({
    url: '/business/enterprise',
    method: 'post',
    data
  });
}

/** 修改企业海关备案信息 */
export function fetchUpdateEnterprise(data: Api.Business.EnterpriseOperateParams) {
  return request<boolean>({
    url: '/business/enterprise',
    method: 'put',
    data
  });
}

/** 批量删除企业海关备案信息 */
export function fetchBatchDeleteEnterprise(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/enterprise/${ids.join(',')}`,
    method: 'delete'
  });
}
