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
    /** cityports */
    type Cityports = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 编码 */
      cityportCode: string;
      /** 中文名 */
      cnname: string;
      /** 英文名 */
      enname: string;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 删除标记（0正常 1已删除） */
      delFlag: number;
    }>;

    /** cityports search params */
    type CityportsSearchParams = CommonType.RecordNullable<
      Pick<Api.TradeComplianceLibrary.Cityports, 'cityportCode' | 'cnname' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** cityports operate params */
    type CityportsOperateParams = CommonType.RecordNullable<
      Pick<Api.TradeComplianceLibrary.Cityports, 'id' | 'cityportCode' | 'cnname' | 'enname'>
    >;

    /** cityports list */
    type CityportsList = Api.Common.PaginatingQueryRecord<Cityports>;
  }
}
