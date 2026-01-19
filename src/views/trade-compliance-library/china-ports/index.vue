<script setup lang="tsx">
import { ref } from 'vue';
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteChinaPorts, fetchGetChinaPortsList } from '@/service/api/trade-compliance-library/china-ports';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import ChinaPortsOperateDrawer from './modules/china-ports-operate-drawer.vue';
import ChinaPortsSearch from './modules/china-ports-search.vue';

defineOptions({
  name: 'ChinaPortsList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const searchParams = ref<Api.TradeComplianceLibrary.ChinaPortsSearchParams>({
  pageNum: 1,
  pageSize: 10,
  chinaPortCode: null,
  name: null,
  enname: null,
  params: {}
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, scrollX } =
  useNaivePaginatedTable({
    api: () => fetchGetChinaPortsList(searchParams.value),
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
        key: 'chinaPortCode',
        title: '口岸编码',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'name',
        title: '口岸名称',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'enname',
        title: '口岸英文名称',
        align: 'center',
        width: 150,
        resizable: true,
        ellipsis: { tooltip: true }
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 130,
        render: row => {
          const divider = () => {
            if (
              !hasAuth('trade-compliance-library:chinaPorts:edit') ||
              !hasAuth('trade-compliance-library:chinaPorts:remove')
            ) {
              return null;
            }
            return <NDivider vertical />;
          };

          const editBtn = () => {
            if (!hasAuth('trade-compliance-library:chinaPorts:edit')) {
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
            if (!hasAuth('trade-compliance-library:chinaPorts:remove')) {
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
  const { error } = await fetchBatchDeleteChinaPorts(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteChinaPorts([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit(id);
}

function handleExport() {
  download('/trade-compliance-library/chinaPorts/export', searchParams.value, `口岸信息_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ChinaPortsSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard title="口岸信息列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('trade-compliance-library:chinaPorts:add')"
          :show-delete="hasAuth('trade-compliance-library:chinaPorts:remove')"
          :show-export="hasAuth('trade-compliance-library:chinaPorts:export')"
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
      <ChinaPortsOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
