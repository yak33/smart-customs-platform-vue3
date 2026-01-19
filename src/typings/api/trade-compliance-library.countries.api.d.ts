/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace TradeComplianceLibrary
   *
   * backend api module: "TradeComplianceLibrary"
   */
  namespace TradeComplianceLibrary {
    /** countries */
    type Countries = Common.CommonRecord<{
      /** 国家编码 */
      code: string;
      /** 国家名称 */
      name: string;
      /** 自定义代码 */
      standardCode: string;
      /** 国家英文名称 */
      enname: string;
      /** 是否启用 */
      isenabled: boolean;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 删除标记 */
      delFlag: number;
      /** 主键 */
      id: CommonType.IdType;
      /** 预警级别（1低 2中 3高） */
      warnLevel: string;
    }>;

    /** countries search params */
    type CountriesSearchParams = CommonType.RecordNullable<
      Pick<
        Api.TradeComplianceLibrary.Countries,
        'code' | 'name' | 'standardCode' | 'enname' | 'isenabled' | 'warnLevel'
      > &
        Api.Common.CommonSearchParams
    >;

    /** countries operate params */
    type CountriesOperateParams = CommonType.RecordNullable<
      Pick<
        Api.TradeComplianceLibrary.Countries,
        'code' | 'name' | 'standardCode' | 'enname' | 'isenabled' | 'id' | 'warnLevel'
      >
    >;

    /** countries list */
    type CountriesList = Api.Common.PaginatingQueryRecord<Countries>;
  }
}
