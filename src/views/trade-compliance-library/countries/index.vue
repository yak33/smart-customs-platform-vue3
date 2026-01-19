<script setup lang="tsx">
import { ref } from 'vue';
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteCountries, fetchGetCountriesList } from '@/service/api/trade-compliance-library/countries';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import CountriesOperateDrawer from './modules/countries-operate-drawer.vue';
import CountriesSearch from './modules/countries-search.vue';

defineOptions({
  name: 'CountriesList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const warnLevelLabelMap: Record<string, string> = {
  '1': '低',
  '2': '中',
  '3': '高'
};

const searchParams = ref<Api.TradeComplianceLibrary.CountriesSearchParams>({
  pageNum: 1,
  pageSize: 10,
  code: null,
  name: null,
  standardCode: null,
  enname: null,
  isenabled: null,
  warnLevel: null,
  params: {}
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, scrollX } =
  useNaivePaginatedTable({
    api: () => fetchGetCountriesList(searchParams.value),
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
        key: 'code',
        title: '国家编码',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: {
          tooltip: true
        }
      },
      {
        key: 'name',
        title: '国家名称',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: {
          tooltip: true
        }
      },
      {
        key: 'enname',
        title: '国家英文名称',
        align: 'center',
        width: 150,
        resizable: true,
        ellipsis: {
          tooltip: true
        }
      },
      {
        key: 'standardCode',
        title: '自定义代码',
        align: 'center',
        width: 120,
        resizable: true,
        ellipsis: {
          tooltip: true
        }
      },
      {
        key: 'isenabled',
        title: '是否启用',
        align: 'center',
        width: 100,
        resizable: true,
        render: row => (row.isenabled ? '是' : '否')
      },
      {
        key: 'warnLevel',
        title: '预警级别',
        align: 'center',
        width: 100,
        resizable: true,
        render: row => warnLevelLabelMap[row.warnLevel] ?? '-'
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 130,
        render: row => {
          const divider = () => {
            if (!hasAuth('business:countries:edit') || !hasAuth('business:countries:remove')) {
              return null;
            }
            return <NDivider vertical />;
          };

          const editBtn = () => {
            if (!hasAuth('business:countries:edit')) {
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
            if (!hasAuth('business:countries:remove')) {
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
  const { error } = await fetchBatchDeleteCountries(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteCountries([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit(id);
}

function handleExport() {
  download('/trade-compliance-library/countries/export', searchParams.value, `国家_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CountriesSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard title="国家列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:countries:add')"
          :show-delete="hasAuth('business:countries:remove')"
          :show-export="hasAuth('business:countries:export')"
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
        resizable
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <CountriesOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
