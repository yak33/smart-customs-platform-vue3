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
    /** hscode */
    type Hscode = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 税号 */
      hscode: string;
      /** 商品名称 */
      gname: string;
      /** 监管条件 */
      controLmark: string;
      /** 法一单位 */
      unit1: string;
      /** 法一单位名称 */
      unit1name: string;
      /** 法二 */
      unit2: string;
      /** 法二名称 */
      unit2name: string;
      /** 检验检疫条件 */
      inspmonitorcond: string;
      /** 备注 */
      notes: string;
      /** 申报要素 */
      sbys: string;
      /** 商检编码：名称 */
      ciqlist: string;
      /** 商检编码 */
      ciqclass: string;
      /** 申报要素必填项 */
      sbysRequired: string;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 是否启用 */
      isEnable: number;
    }>;

    /** hscode search params */
    type HscodeSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Business.Hscode,
        | 'hscode'
        | 'gname'
        | 'controLmark'
        | 'unit1'
        | 'unit1name'
        | 'unit2'
        | 'unit2name'
        | 'inspmonitorcond'
        | 'notes'
        | 'sbys'
        | 'ciqlist'
        | 'ciqclass'
        | 'sbysRequired'
        | 'isEnable'
      > &
        Api.Common.CommonSearchParams
    >;

    /** hscode operate params */
    type HscodeOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Business.Hscode,
        | 'id'
        | 'hscode'
        | 'gname'
        | 'controLmark'
        | 'unit1'
        | 'unit1name'
        | 'unit2'
        | 'unit2name'
        | 'inspmonitorcond'
        | 'notes'
        | 'sbys'
        | 'ciqlist'
        | 'ciqclass'
        | 'sbysRequired'
        | 'isEnable'
      >
    >;

    /** hscode list */
    type HscodeList = Api.Common.PaginatingQueryRecord<Hscode>;
  }
}
