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
    /** currencies */
    type Currencies = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 编码 110等 */
      code: string;
      /** 开证币种 USD/CYN等 */
      currency: string;
      /** 币种名称 */
      name: string;
      /** 币种英文名称 */
      enname: string;
      /** 币种顺序 */
      currencyOrder: number;
      /** 汇率 */
      rate: string;
      /** 删除标记 */
      delFlag: string;
      /** 阀值低 */
      thresholdLow: number;
      /** 阀值高 */
      thresholdHigh: number;
    }>;

    /** currencies search params */
    type CurrenciesSearchParams = CommonType.RecordNullable<
      Pick<
        Api.TradeComplianceLibrary.Currencies,
        'code' | 'currency' | 'name' | 'enname' | 'currencyOrder' | 'rate' | 'thresholdLow' | 'thresholdHigh'
      > &
        Api.Common.CommonSearchParams
    >;

    /** currencies operate params */
    type CurrenciesOperateParams = CommonType.RecordNullable<
      Pick<
        Api.TradeComplianceLibrary.Currencies,
        'id' | 'code' | 'currency' | 'name' | 'enname' | 'currencyOrder' | 'rate' | 'thresholdLow' | 'thresholdHigh'
      >
    >;

    /** currencies list */
    type CurrenciesList = Api.Common.PaginatingQueryRecord<Currencies>;
  }
}
