/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace Dictionary
   *
   * backend api module: "dictionary"
   */
  namespace Dictionary {
    /**
     * 中国口岸信息数据模型
     * 对应后端 ErpChinaPorts 实体类
     */
    type Cnports = Common.CommonRecord<{
      /** 口岸ID - 主键 */
      id: CommonType.IdType;
      /** 出境口岸/国内口岸编码 */
      chinaPortCode: string;
      /** 出境口岸/国内口岸名称 */
      name: string;
      /** 出境口岸/国内口岸英文名称 */
      enname?: string;
      /** 删除标记（0正常 1已删除） */
      delFlag?: number;
      /** 租户ID */
      tenantId?: CommonType.IdType;
    }>;

    /** 口岸搜索参数 - 用于前端搜索表单提交 */
    type CnportsSearchParams = CommonType.RecordNullable<
      {
        /** 口岸编码 */
        chinaPortCode?: string;
        /** 口岸名称 */
        name?: string;
        /** 口岸英文名称 */
        enname?: string;
        /** 状态（用于前端搜索筛选） */
        status?: Common.EnableStatus;
        /** 删除标记 */
        delFlag?: number;
      } & Api.Common.CommonSearchParams
    >;

    /** 口岸分页列表响应 */
    type CnportsList = Api.Common.PaginatingQueryRecord<Cnports>;

    /** 口岸操作参数 - 用于新增和编辑口岸信息 */
    type CnportsOperateParams = {
      /** 口岸ID - 编辑时必需 */
      id?: CommonType.IdType;
      /** 出境口岸/国内口岸编码 - 必需 */
      chinaPortCode: string;
      /** 出境口岸/国内口岸名称 - 必需 */
      name: string;
      /** 出境口岸/国内口岸英文名称 - 可选 */
      enname?: string;
      /** 删除标记 */
      delFlag?: number;
    };

    /** 口岸选项类型 - 用于下拉选择组件 */
    type CnportsOption = {
      /** 口岸编码 */
      value: string;
      /** 口岸名称 */
      label: string;
      /** 口岸英文名称 */
      enLabel?: string;
    };

    /** 口岸导入参数 */
    type CnportsImportParams = {
      /** 导入文件 */
      file: File;
      /** 是否覆盖已存在数据 */
      overwrite?: boolean;
    };

    /** 口岸导出参数 */
    type CnportsExportParams = CnportsSearchParams;
  }
}
