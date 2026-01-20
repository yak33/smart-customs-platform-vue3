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
    /** pn */
    type Pn = Common.CommonRecord<{
      /** 商品流水号 */
      id: CommonType.IdType;
      /** 租户流水号 */
      tenantId: CommonType.IdType;
      /** 所属企业租户ID */
      ownerId: string;
      /** 物料号 */
      partNumber: string;
      /** 供应商 */
      customerNo: string;
      /** 附加码 */
      additionalCode: string;
      /** 申报品名 */
      hsname: string;
      /** 税号 */
      hscode: string;
      /** 申报要素 */
      hsmodel: string;
      /** 疫检代码 */
      ciqCode: string;
      /** 疫检名称 */
      ciqName: string;
      /** 申报要素备注 */
      hsmemo: string;
      /** 型号规格 */
      model: string;
      /** 中文品名 */
      name: string;
      /** 英文品名 */
      enName: string;
      /** 英文描述 */
      enMemo: string;
      /** 中文描述 */
      cnMemo: string;
      /** 单位 */
      unit: string;
      /** 包装 */
      pack: string;
      /** 是否危品 */
      danger: string;
      /** 危品等级 */
      dangerLevel: string;
      /** UN号 */
      un: string;
      /** 化工品号 */
      chemicalsNo: string;
      /** 单价 */
      price: number;
      /** 原产国 */
      country: string;
      /** 净重 */
      netWeight: number;
      /** 客户确认 */
      customerConfirm: string;
      /** 是否审核 */
      isAudited: string;
      /** 已验核实货 */
      isChecked: string;
      /** 关联附件 */
      attachments: string;
      /** 商品类型（1原材料、2辅料、3成品、4半成品、5商品） */
      partType: string;
      /** 待备案状态（0未标记，1已标记。默认未标记） */
      partStatus: string;
      /** 更新说明 */
      updateRemark: string;
      /** 备注 */
      remark: string;
      /** 创建日期 */
      createDate: string;
      /** 最后更新人 */
      lastUpdateBy: string;
      /** 最后更新日期 */
      lastUpdateDate: string;
    }>;

    /** pn search params */
    type PnSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Business.Pn,
        | 'ownerId'
        | 'partNumber'
        | 'customerNo'
        | 'additionalCode'
        | 'hsname'
        | 'hscode'
        | 'hsmodel'
        | 'ciqCode'
        | 'ciqName'
        | 'hsmemo'
        | 'model'
        | 'name'
        | 'enName'
        | 'enMemo'
        | 'cnMemo'
        | 'unit'
        | 'pack'
        | 'danger'
        | 'dangerLevel'
        | 'un'
        | 'chemicalsNo'
        | 'price'
        | 'country'
        | 'netWeight'
        | 'customerConfirm'
        | 'isAudited'
        | 'isChecked'
        | 'attachments'
        | 'partType'
        | 'partStatus'
        | 'updateRemark'
        | 'createDate'
        | 'lastUpdateBy'
        | 'lastUpdateDate'
      > &
        Api.Common.CommonSearchParams
    >;

    /** pn operate params */
    type PnOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Business.Pn,
        | 'id'
        | 'ownerId'
        | 'partNumber'
        | 'customerNo'
        | 'additionalCode'
        | 'hsname'
        | 'hscode'
        | 'hsmodel'
        | 'ciqCode'
        | 'ciqName'
        | 'hsmemo'
        | 'model'
        | 'name'
        | 'enName'
        | 'enMemo'
        | 'cnMemo'
        | 'unit'
        | 'pack'
        | 'danger'
        | 'dangerLevel'
        | 'un'
        | 'chemicalsNo'
        | 'price'
        | 'country'
        | 'netWeight'
        | 'customerConfirm'
        | 'isAudited'
        | 'isChecked'
        | 'attachments'
        | 'partType'
        | 'partStatus'
        | 'updateRemark'
        | 'remark'
        | 'createDate'
        | 'lastUpdateBy'
        | 'lastUpdateDate'
      >
    >;

    /** pn list */
    type PnList = Api.Common.PaginatingQueryRecord<Pn>;
  }
}
