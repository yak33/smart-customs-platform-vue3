import { request } from '@/service/request';

/** 获取企业海关备案信息库列表 */
export function fetchGetCustomerEnterpriseList(params?: Api.Business.CustomerEnterpriseSearchParams) {
  return request<Api.Business.CustomerEnterpriseList>({
    url: '/business/customer-enterprise/list',
    method: 'get',
    params
  });
}

/** 新增企业海关备案信息库 */
export function fetchCreateCustomerEnterprise(data: Api.Business.CustomerEnterpriseOperateParams) {
  return request<boolean>({
    url: '/business/customer-enterprise',
    method: 'post',
    data
  });
}

/** 修改企业海关备案信息库 */
export function fetchUpdateCustomerEnterprise(data: Api.Business.CustomerEnterpriseOperateParams) {
  return request<boolean>({
    url: '/business/customer-enterprise',
    method: 'put',
    data
  });
}

/** 批量删除企业海关备案信息库 */
export function fetchBatchDeleteCustomerEnterprise(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/customer-enterprise/${ids.join(',')}`,
    method: 'delete'
  });
}
