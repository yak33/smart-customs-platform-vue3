/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace Business
   *
   * backend api module: "Business"
   */
  namespace Business {
    /** customs ports */
    type CustomsPorts = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 关区编码 */
      customsPortCode: string;
      /** 关区名称 */
      name: string;
      /** 关区全称 */
      langName: string;
      /** DELETEDAT */
      deletedAt: string;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 删除标记（0正常 1已删除） */
      delFlag: number;
    }>;

    /** customs ports search params */
    type CustomsPortsSearchParams = CommonType.RecordNullable<
      Pick<Api.Business.CustomsPorts, 'customsPortCode' | 'name' | 'langName'> & Api.Common.CommonSearchParams
    >;

    /** customs ports operate params */
    type CustomsPortsOperateParams = CommonType.RecordNullable<
      Pick<Api.Business.CustomsPorts, 'id' | 'customsPortCode' | 'name' | 'langName'>
    >;

    /** customs ports list */
    type CustomsPortsList = Api.Common.PaginatingQueryRecord<CustomsPorts>;
  }
}
