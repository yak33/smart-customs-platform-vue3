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
    /** customer-enterprise */
    type CustomerEnterprise = Common.CommonRecord<{
      /** 流水号 */
      id: CommonType.IdType;
      /** 企业名称 */
      departName: string;
      /** 社会统一信用代码 */
      socialCode: string;
      /** 海关编码 */
      departcd: string;
      /** 十位检验检疫编码 */
      ciqCode: string;
      /** AEO代码 */
      aeo: string;
      /** 企业信用等级 */
      creditRating: string;
      /** 有效期 */
      trrmOfValidity: CommonType.IdType;
      /** 注销 */
      cancellation: string;
      /** 经营类别 */
      manageType: string;
      /** 0=收发货人 1=生产销售单位/消费使用单位 2=申报单位
该参数，当选择 0 时，只返回备案类型是收发货人的，当选择 2 时，只选择备案类型是报关行的。选择 1 时，会返回所有的可用信息。 */
      type: string;
    }>;

    /** customer-enterprise search params */
    type CustomerEnterpriseSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Business.CustomerEnterprise,
        | 'departName'
        | 'socialCode'
        | 'departcd'
        | 'ciqCode'
        | 'aeo'
        | 'creditRating'
        | 'trrmOfValidity'
        | 'cancellation'
        | 'manageType'
        | 'type'
      > &
        Api.Common.CommonSearchParams
    >;

    /** customer-enterprise operate params */
    type CustomerEnterpriseOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Business.CustomerEnterprise,
        | 'id'
        | 'departName'
        | 'socialCode'
        | 'departcd'
        | 'ciqCode'
        | 'aeo'
        | 'creditRating'
        | 'trrmOfValidity'
        | 'cancellation'
        | 'manageType'
        | 'type'
      >
    >;

    /** customer-enterprise list */
    type CustomerEnterpriseList = Api.Common.PaginatingQueryRecord<CustomerEnterprise>;
  }
}
