/**
 * namespace Business
 *
 * backend api module: "Business"
 */
declare namespace Api {
  namespace Business {
    /** china ports */
    type ChinaPorts = Common.CommonRecord<{
      /** ID */
      id: CommonType.IdType;
      /** 出境口岸/国内口岸编码 */
      chinaPortCode: string;
      /** 出境口岸/国内口岸名称 */
      name: string;
      /** 出境口岸/国内口岸英文名称 */
      enname: string;
      /** 租户ID */
      tenantId: CommonType.IdType;
      /** 删除标记（0正常 1已删除） */
      delFlag: number;
    }>;

    /** china ports search params */
    type ChinaPortsSearchParams = CommonType.RecordNullable<
      Pick<Api.Business.ChinaPorts, 'chinaPortCode' | 'name' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** china ports operate params */
    type ChinaPortsOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Business.ChinaPorts,
        | 'id'
        | 'chinaPortCode'
        | 'name'
        | 'enname'
        | 'tenantId'
        | 'createBy'
        | 'delFlag'
        | 'updateTime'
        | 'createTime'
        | 'updateBy'
      >
    >;

    /** china ports list */
    type ChinaPortsList = Api.Common.PaginatingQueryRecord<ChinaPorts>;

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
      Pick<Api.Business.Cityports, 'cityportCode' | 'cnname' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** cityports operate params */
    type CityportsOperateParams = CommonType.RecordNullable<
      Pick<Api.Business.Cityports, 'id' | 'cityportCode' | 'cnname' | 'enname'>
    >;

    /** cityports list */
    type CityportsList = Api.Common.PaginatingQueryRecord<Cityports>;

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
      Pick<Api.Business.Currencies, 'code' | 'currency' | 'name' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** currencies operate params */
    type CurrenciesOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Business.Currencies,
        'id' | 'code' | 'currency' | 'name' | 'enname' | 'rate' | 'thresholdLow' | 'thresholdHigh'
      >
    >;

    /** currencies list */
    type CurrenciesList = Api.Common.PaginatingQueryRecord<Currencies>;

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
      isenabled: number;
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
      Pick<Api.Business.Countries, 'code' | 'name' | 'standardCode' | 'enname'> & Api.Common.CommonSearchParams
    >;

    /** countries operate params */
    type CountriesOperateParams = CommonType.RecordNullable<
      Pick<Api.Business.Countries, 'code' | 'name' | 'standardCode' | 'enname' | 'isenabled' | 'id'>
    >;

    /** countries list */
    type CountriesList = Api.Common.PaginatingQueryRecord<Countries>;
  }
}
