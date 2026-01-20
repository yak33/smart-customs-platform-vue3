<script setup lang="tsx">
import { ref } from 'vue';
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteHscode, fetchGetHscodeList } from '@/service/api/trade-compliance-library/hscode';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import HscodeOperateDrawer from './modules/hscode-operate-drawer.vue';
import HscodeSearch from './modules/hscode-search.vue';

defineOptions({
  name: 'HscodeList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const searchParams = ref<Api.TradeComplianceLibrary.HscodeSearchParams>({
  pageNum: 1,
  pageSize: 10,
  hscode: null,
  gname: null,
  controLmark: null,
  unit1: null,
  unit1name: null,
  unit2: null,
  unit2name: null,
  inspmonitorcond: null,
  notes: null,
  sbys: null,
  ciqlist: null,
  ciqclass: null,
  sbysRequired: null,
  isEnable: null,
  params: {}
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, scrollX } =
  useNaivePaginatedTable({
    api: () => fetchGetHscodeList(searchParams.value),
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
        render: (_, index) => ((searchParams.value.pageNum || 1) - 1) * (searchParams.value.pageSize || 10) + index + 1
      },
      {
        key: 'hscode',
        title: '商品税号',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'gname',
        title: '商品名称',
        align: 'center',
        width: 150,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'controLmark',
        title: '监管条件',
        align: 'center',
        width: 100,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'unit1',
        title: '法一单位',
        align: 'center',
        width: 100,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'unit1name',
        title: '法一名称',
        align: 'center',
        width: 100,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'unit2',
        title: '法二单位',
        align: 'center',
        width: 100,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'unit2name',
        title: '法二名称',
        align: 'center',
        width: 100,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'inspmonitorcond',
        title: '检验检疫条件',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'notes',
        title: '备注',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'sbys',
        title: '申报要素',
        align: 'center',
        width: 150,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'ciqlist',
        title: '商检编码名称',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'ciqclass',
        title: '商检编码',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'sbysRequired',
        title: '申报要素必填项',
        align: 'center',
        width: 130,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'isEnable',
        title: '是否启用',
        align: 'center',
        width: 100,
        resizable: true,
        render: row => (row.isEnable ? '是' : '否')
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 130,
        render: row => {
          const divider = () => {
            if (!hasAuth('tradeComplianceLibrary:hscode:edit') || !hasAuth('tradeComplianceLibrary:hscode:remove')) {
              return null;
            }
            return <NDivider vertical />;
          };

          const editBtn = () => {
            if (!hasAuth('tradeComplianceLibrary:hscode:edit')) {
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
            if (!hasAuth('tradeComplianceLibrary:hscode:remove')) {
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
  const { error } = await fetchBatchDeleteHscode(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteHscode([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit(id);
}

function handleExport() {
  download('/trade-compliance-library/hscode/export', searchParams.value, `海关编码税则_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <HscodeSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard title="海关编码税则列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('tradeComplianceLibrary:hscode:add')"
          :show-delete="hasAuth('tradeComplianceLibrary:hscode:remove')"
          :show-export="hasAuth('tradeComplianceLibrary:hscode:export')"
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
      <HscodeOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
