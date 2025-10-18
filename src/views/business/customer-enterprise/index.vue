<script setup lang="tsx">
import { NDivider } from 'naive-ui';
import {
  fetchBatchDeleteCustomerEnterprise,
  fetchGetCustomerEnterpriseList
} from '@/service/api/business/customer-enterprise';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import CustomerEnterpriseOperateDrawer from './modules/customer-enterprise-operate-drawer.vue';
import CustomerEnterpriseSearch from './modules/customer-enterprise-search.vue';

defineOptions({
  name: 'CustomerEnterpriseList'
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
  apiFn: fetchGetCustomerEnterpriseList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    departName: null,
    socialCode: null,
    departcd: null,
    ciqCode: null,
    aeo: null,
    creditRating: null,
    trrmOfValidity: null,
    cancellation: null,
    manageType: null,
    type: null,
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
      key: 'departName',
      title: '企业名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 250
    },
    {
      key: 'socialCode',
      title: '社会统一信用代码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 250
    },
    {
      key: 'departcd',
      title: '海关编码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'ciqCode',
      title: '十位检验检疫编码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120
    },
    {
      key: 'aeo',
      title: 'AEO代码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 100
    },
    {
      key: 'creditRating',
      title: '企业信用等级',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 100
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      fixed: 'right',
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('business:customer-enterprise:edit') || !hasAuth('business:customer-enterprise:remove')) {
            return null;
          }
          return <NDivider vertical />;
        };

        const editBtn = () => {
          if (!hasAuth('business:customer-enterprise:edit')) {
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
          if (!hasAuth('business:customer-enterprise:remove')) {
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
  const { error } = await fetchBatchDeleteCustomerEnterprise(checkedRowKeys.value);
  if (error) return;
  await onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteCustomerEnterprise([id]);
  if (error) return;
  await onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit('id', id);
}

function handleExport() {
  download('/business/customer-enterprise/export', searchParams, `企业海关备案信息库_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CustomerEnterpriseSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="企业海关备案信息库列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:customer-enterprise:add')"
          :show-delete="hasAuth('business:customer-enterprise:remove')"
          :show-export="hasAuth('business:customer-enterprise:export')"
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
      <CustomerEnterpriseOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
