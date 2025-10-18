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
    /** units */
    type Units = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 单位编码 */
      code: string;
      /** 单位名称 */
      name: string;
      /** 英文代码 */
      itemKey: string;
      /** 单位英文名称 */
      enname: string;
      /** 删除标记 */
      delFlag: number;
      /** 租户ID */
      tenantId: CommonType.IdType;
    }>;

    /** units search params */
    type UnitsSearchParams = CommonType.RecordNullable<
      Pick<Api.Business.Units, 'code' | 'name' | 'itemKey' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** units operate params */
    type UnitsOperateParams = CommonType.RecordNullable<
      Pick<Api.Business.Units, 'id' | 'code' | 'name' | 'itemKey' | 'enname'>
    >;

    /** units list */
    type UnitsList = Api.Common.PaginatingQueryRecord<Units>;
  }
}
