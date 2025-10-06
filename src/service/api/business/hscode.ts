import { request } from '@/service/request';

/** 获取海关编码申报税则相关列表 */
export function fetchGetHscodeList (params?: Api.Business.HscodeSearchParams) {
    return request<Api.Business.HscodeList>({
        url: '/business/hscode/list',
        method: 'get',
        params
    });
}

/** 新增海关编码申报税则相关 */
export function fetchCreateHscode (data: Api.Business.HscodeOperateParams) {
    return request<boolean>({
        url: '/business/hscode',
        method: 'post',
        data
    });
}

/** 修改海关编码申报税则相关 */
export function fetchUpdateHscode (data: Api.Business.HscodeOperateParams) {
    return request<boolean>({
        url: '/business/hscode',
        method: 'put',
        data
    });
}

/** 批量删除海关编码申报税则相关 */
export function fetchBatchDeleteHscode (ids: CommonType.IdType[]) {
    return request<boolean>({
        url: `/business/hscode/${ids.join(',')}`,
        method: 'delete'
    });
}
