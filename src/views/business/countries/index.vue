<script setup lang="tsx">
import { NDivider, NTag } from 'naive-ui';
import { fetchBatchDeleteCountries, fetchGetCountriesList } from '@/service/api/business/countries';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
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
  apiFn: fetchGetCountriesList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    code: null,
    name: null,
    standardCode: null,
    enname: null,
    params: {}
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
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 64
    },
    {
      key: 'code',
      title: '国家编码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'name',
      title: '国家名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'enname',
      title: '国家英文名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'standardCode',
      title: '自定义代码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'isenabled',
      title: '是否启用',
      align: 'center',
      render: row => {
        const isEnabled = row.isenabled;
        const text = isEnabled ? '启用' : '未启用';
        const type = isEnabled ? 'success' : 'default';
        return <NTag type={type} size="small">{text}</NTag>;
      },
      width: 90
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      fixed: 'right',
      width: 90,
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
              onClick={() => edit(row.id!)}
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
  handleEdit('id', id);
}

function handleExport() {
  download('/business/countries/export', searchParams, `国家_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CountriesSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="国家列表" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
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
        :scroll-x="962"
        :loading="loading"
        remote
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
