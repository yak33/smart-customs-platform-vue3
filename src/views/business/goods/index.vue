<script setup lang="tsx">
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteGoods, fetchGetGoodsList } from '@/service/api/business/goods';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import GoodsOperateDrawer from './modules/goods-operate-drawer.vue';
import GoodsSearch from './modules/goods-search.vue';

defineOptions({
  name: 'GoodsList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetGoodsList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    ownerId: null,
    partNumber: null,
    customerNo: null,
    additionalCode: null,
    hsname: null,
    hscode: null,
    hsmodel: null,
    ciqCode: null,
    ciqName: null,
    hsmemo: null,
    model: null,
    name: null,
    enName: null,
    enMemo: null,
    cnMemo: null,
    unit: null,
    pack: null,
    danger: null,
    dangerLevel: null,
    un: null,
    chemicalsNo: null,
    price: null,
    country: null,
    netWeight: null,
    customerConfirm: null,
    isAudited: null,
    isChecked: null,
    attachments: null,
    partType: null,
    partStatus: null,
    updateRemark: null,
    createDate: null,
    lastUpdateBy: null,
    lastUpdateDate: null,
    params: {}
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      fixed: 'left',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'ownerId',
      title: '所属企业',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'partNumber',
      title: '物料号',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'hsname',
      title: '申报品名',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'hscode',
      title: '税号',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'hsmodel',
      title: '申报要素',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 280
    },
    {
      key: 'ciqCode',
      title: '疫检代码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 100
    },
    {
      key: 'ciqName',
      title: '疫检名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 100
    },
    {
      key: 'model',
      title: '型号规格',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'name',
      title: '中文品名',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'enName',
      title: '英文品名',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'enMemo',
      title: '英文描述',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'cnMemo',
      title: '中文描述',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'unit',
      title: '单位',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'pack',
      title: '包装',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'un',
      title: 'UN号',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'chemicalsNo',
      title: '化工品号',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'country',
      title: '原产国',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'customerConfirm',
      title: '客户确认',
      align: 'center',
      resizable: true,
      minWidth: 120,
      render: row => {
        const statusMap: Record<number, string> = {
          0: '否',
          1: '是'
        };
        return statusMap[row.customerConfirm as number] || '-';
      }
    },
    {
      key: 'isAudited',
      title: '是否审核',
      align: 'center',
      resizable: true,
      minWidth: 120,
      render: row => {
        const statusMap: Record<number, string> = {
          0: '否',
          1: '是'
        };
        return statusMap[row.isAudited as number] || '-';
      }
    },
    {
      key: 'isChecked',
      title: '已验核实货',
      align: 'center',
      resizable: true,
      minWidth: 120,
      render: row => {
        const statusMap: Record<number, string> = {
          0: '否',
          1: '是'
        };
        return statusMap[row.isChecked as number] || '-';
      }
    },
    {
      key: 'attachments',
      title: '关联附件',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'partType',
      title: '商品类型',
      align: 'center',
      resizable: true,
      minWidth: 120,
      render: row => {
        const typeMap: Record<string, string> = {
          '1': '原材料',
          '2': '辅料',
          '3': '成品',
          '4': '半成品',
          '5': '商品'
        };
        return typeMap[row.partType as string] || '-';
      }
    },
    {
      key: 'partStatus',
      title: '备案状态',
      align: 'center',
      resizable: true,
      minWidth: 120,
      render: row => {
        const statusMap: Record<number, string> = {
          0: '未标记',
          1: '已标记'
        };
        return statusMap[row.partStatus as number] || '-';
      }
    },
    {
      key: 'updateRemark',
      title: '更新说明',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'remark',
      title: '备注',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      fixed: 'right',
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('business:goods:edit') || !hasAuth('business:goods:remove')) {
            return null;
          }
          return <NDivider vertical />;
        };

        const editBtn = () => {
          if (!hasAuth('business:goods:edit')) {
            return null;
          }
          return (
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:drive-file-rename-outline-outline"
              tooltipContent={$t('common.edit')}
              onClick={() => edit(row.id!)}
            />
          );
        };

        const deleteBtn = () => {
          if (!hasAuth('business:goods:remove')) {
            return null;
          }
          return (
            <ButtonIcon
              text
              type="error"
              icon="material-symbols:delete-outline"
              tooltipContent={$t('common.delete')}
              popconfirmContent={$t('common.confirmDelete')}
              onPositiveClick={() => handleDelete(row.id!)}
            />
          );
        };

        return (
          <div class="flex-center gap-8px">
            {editBtn()}
            {divider()}
            {deleteBtn()}
          </div>
        );
      }
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const { error } = await fetchBatchDeleteGoods(checkedRowKeys.value);
  if (error) return;
  await onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteGoods([id]);
  if (error) return;
  await onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit('id', id);
}

function handleExport() {
  download('/business/goods/export', searchParams, `商品库_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <GoodsSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="商品库列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:goods:add')"
          :show-delete="hasAuth('business:goods:remove')"
          :show-export="hasAuth('business:goods:export')"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @export="handleExport"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="4200"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <GoodsOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
