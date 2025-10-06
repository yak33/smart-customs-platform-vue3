<script setup lang="tsx">
import { NDivider, NTag} from 'naive-ui';
import { fetchBatchDeleteCityports, fetchGetCityportsList } from '@/service/api/business/cityports';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import CityportsOperateDrawer from './modules/cityports-operate-drawer.vue';
import CityportsSearch from './modules/cityports-search.vue';

defineOptions({
  name: 'CityportsList'
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
  apiFn: fetchGetCityportsList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    cityportCode: null,
    cnname: null,
    enname: null,
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
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 64
    },
    {
      key: 'cityportCode',
      title: '编码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'cnname',
      title: '中文名',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 150
    },
    {
      key: 'enname',
      title: '英文名',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 150
    },
    {
      key: 'delFlag',
      title: '状态',
      align: 'center',
      width: 90,
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      render: row => {
        const delFlag = Number(row.delFlag) === 0;
        const text = delFlag ? '正常' : '停用';
        const type = delFlag ? 'success' : 'default';
        return <NTag type={type} size="small">{text}</NTag>;
      }
    },
    {
      key: 'createBy',
      title: '创建人',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      fixed: 'right',
      width: 100,
      render: row => {
        const divider = () => {
          if (!hasAuth('business:cityports:edit') || !hasAuth('business:cityports:remove')) {
            return null;
          }
          return <NDivider vertical />;
        };

        const editBtn = () => {
          if (!hasAuth('business:cityports:edit')) {
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
          if (!hasAuth('business:cityports:remove')) {
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
  const { error } = await fetchBatchDeleteCityports(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteCityports([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit('id', id);
}

function handleExport() {
  download('/business/cityports/export', searchParams, `港口_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CityportsSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="港口列表" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:cityports:add')"
          :show-delete="hasAuth('business:cityports:remove')"
          :show-export="hasAuth('business:cityports:export')"
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
      <CityportsOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
