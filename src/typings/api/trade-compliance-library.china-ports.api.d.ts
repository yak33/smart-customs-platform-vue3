/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace Trade-compliance-library
   *
   * backend api module: "Trade-compliance-library"
   */
  namespace TradeComplianceLibrary {
    /** china ports */
    type ChinaPorts = Common.CommonRecord<{
      /** ID */
      id: CommonType.IdType;
      /** 口岸编码 */
      chinaPortCode: string;
      /** 口岸名称 */
      name: string;
      /** 口岸英文名称 */
      enname: string;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 删除标记（0正常 1已删除） */
      delFlag: number;
    }>;

    /** china ports search params */
    type ChinaPortsSearchParams = CommonType.RecordNullable<
      Pick<Api.TradeComplianceLibrary.ChinaPorts, 'chinaPortCode' | 'name' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** china ports operate params */
    type ChinaPortsOperateParams = CommonType.RecordNullable<
      Pick<Api.TradeComplianceLibrary.ChinaPorts, 'id' | 'chinaPortCode' | 'name' | 'enname'>
    >;

    /** china ports list */
    type ChinaPortsList = Api.Common.PaginatingQueryRecord<ChinaPorts>;
  }
}
