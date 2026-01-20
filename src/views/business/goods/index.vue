<script setup lang="tsx">
import { ref } from 'vue';
import { NDivider } from 'naive-ui';
import { fetchBatchDeletePn, fetchGetPnList } from '@/service/api/business/goodsPn';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import PnOperateDrawer from './modules/pn-operate-drawer.vue';
import PnSearch from './modules/pn-search.vue';

defineOptions({
  name: 'PnList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const searchParams = ref<Api.Business.PnSearchParams>({
  pageNum: 1,
  pageSize: 10,
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
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, scrollX } =
  useNaivePaginatedTable({
    api: () => fetchGetPnList(searchParams.value),
    transform: response => defaultTransform(response),
    onPaginationParamsChange: params => {
      searchParams.value.pageNum = params.page;
      searchParams.value.pageSize = params.pageSize;
    },
    columns: () => [
      {
        type: 'selection',
        align: 'center',
        width: 48
      },
      {
        key: 'index',
        title: $t('common.index'),
        align: 'center',
        width: 64,
        render: (_, index) => index + 1
      },
      {
        key: 'partNumber',
        title: '物料号',
        align: 'center',
        width: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'customerNo',
        title: '供应商',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'hsname',
        title: '申报品名',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'hscode',
        title: '税号',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'hsmodel',
        title: '申报要素',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'ciqCode',
        title: '疫检代码',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'ciqName',
        title: '疫检名称',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'hsmemo',
        title: '申报要素备注',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'model',
        title: '型号规格',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'name',
        title: '中文品名',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'enName',
        title: '英文品名',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'enMemo',
        title: '英文描述',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'cnMemo',
        title: '中文描述',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'unit',
        title: '单位',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'pack',
        title: '包装',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'danger',
        title: '是否危品',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'dangerLevel',
        title: '危品等级',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'un',
        title: 'UN号',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'chemicalsNo',
        title: '化工品号',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'price',
        title: '单价',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'country',
        title: '原产国',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'netWeight',
        title: '净重',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'customerConfirm',
        title: '客户确认',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'isAudited',
        title: '是否审核',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'isChecked',
        title: '已验核实货',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'attachments',
        title: '关联附件',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'partType',
        title: '商品类型',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'partStatus',
        title: '待备案状态',
        align: 'center',
        width: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'updateRemark',
        title: '更新说明',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'remark',
        title: '备注',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'createDate',
        title: '创建日期',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'lastUpdateBy',
        title: '最后更新人',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'lastUpdateDate',
        title: '最后更新日期',
        align: 'center',
        minWidth: 120,
        ellipsis: { tooltip: true }
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 130,
        render: row => {
          const divider = () => {
            if (!hasAuth('business:pn:edit') || !hasAuth('business:pn:remove')) {
              return null;
            }
            return <NDivider vertical />;
          };

          const editBtn = () => {
            if (!hasAuth('business:pn:edit')) {
              return null;
            }
            return (
              <ButtonIcon
                text
                type="primary"
                icon="material-symbols:drive-file-rename-outline-outline"
                tooltipContent={$t('common.edit')}
                onClick={() => edit(row.id)}
              />
            );
          };

          const deleteBtn = () => {
            if (!hasAuth('business:pn:remove')) {
              return null;
            }
            return (
              <ButtonIcon
                text
                type="error"
                icon="material-symbols:delete-outline"
                tooltipContent={$t('common.delete')}
                popconfirmContent={$t('common.confirmDelete')}
                onPositiveClick={() => handleDelete(row.id)}
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
  useTableOperate(data, 'id', getData);

async function handleBatchDelete() {
  // request
  const { error } = await fetchBatchDeletePn(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeletePn([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit(id);
}

function handleExport() {
  download('/business/pn/export', searchParams.value, `商品库_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <PnSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard title="商品库列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:pn:add')"
          :show-delete="hasAuth('business:pn:remove')"
          :show-export="hasAuth('business:pn:export')"
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
        :scroll-x="scrollX"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <PnOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
