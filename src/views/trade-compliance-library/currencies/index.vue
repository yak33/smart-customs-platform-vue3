<script setup lang="tsx">
import { ref } from 'vue';
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteCurrencies, fetchGetCurrenciesList } from '@/service/api/trade-compliance-library/currencies';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import CurrenciesOperateDrawer from './modules/currencies-operate-drawer.vue';
import CurrenciesSearch from './modules/currencies-search.vue';

defineOptions({
  name: 'CurrenciesList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const searchParams = ref<Api.TradeComplianceLibrary.CurrenciesSearchParams>({
  pageNum: 1,
  pageSize: 10,
  code: null,
  currency: null,
  name: null,
  enname: null,
  currencyOrder: null,
  rate: null,
  thresholdLow: null,
  thresholdHigh: null,
  params: {}
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, scrollX } =
  useNaivePaginatedTable({
    api: () => fetchGetCurrenciesList(searchParams.value),
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
        key: 'code',
        title: '币种编码',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'currency',
        title: '开证币种',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'name',
        title: '币种名称',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'enname',
        title: '币种英文名称',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'rate',
        title: '汇率',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'thresholdLow',
        title: '阀值低',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'thresholdHigh',
        title: '阀值高',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 130,
        render: row => {
          const divider = () => {
            if (
              !hasAuth('tradeComplianceLibrary:currencies:edit') ||
              !hasAuth('tradeComplianceLibrary:currencies:remove')
            ) {
              return null;
            }
            return <NDivider vertical />;
          };

          const editBtn = () => {
            if (!hasAuth('tradeComplianceLibrary:currencies:edit')) {
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
            if (!hasAuth('tradeComplianceLibrary:currencies:remove')) {
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
  const { error } = await fetchBatchDeleteCurrencies(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteCurrencies([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit(id);
}

function handleExport() {
  download('/trade-compliance-library/currencies/export', searchParams.value, `币制_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CurrenciesSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard title="币制列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('tradeComplianceLibrary:currencies:add')"
          :show-delete="hasAuth('v:currencies:remove')"
          :show-export="hasAuth('v:currencies:export')"
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
      <CurrenciesOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
