<script setup lang="tsx">
import { NDivider, NTag } from 'naive-ui';
import { fetchBatchDeleteHscode, fetchGetHscodeList } from '@/service/api/business/hscode';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
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
  apiFn: fetchGetHscodeList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
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
      key: 'hscode',
      title: '税号',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'gname',
      title: '商品名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 230
    },
    {
      key: 'controLmark',
      title: '监管条件',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'unit1',
      title: '法一单位',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'unit1name',
      title: '法一单位名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'unit2',
      title: '法二',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'unit2name',
      title: '法二名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'inspmonitorcond',
      title: '检验检疫条件',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'sbys',
      title: '申报要素',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 180
    },
    {
      key: 'ciqlist',
      title: '商检编码名称',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'ciqclass',
      title: '商检编码',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'sbysRequired',
      title: '申报要素必填项',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      width: 120
    },
    {
      key: 'isEnable',
      title: '是否启用',
      align: 'center',
      resizable: true,
      ellipsis: {
        tooltip: true
      },
      minWidth: 120,
      render: row => {
        const isEnabled = Number(row.isEnable) === 1;
        const text = isEnabled ? '启用' : '未启用';
        const type = isEnabled ? 'success' : 'default';
        return <NTag type={type} size="small">{text}</NTag>;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      resizable: true,
      fixed: 'right',
      ellipsis: {
        tooltip: true
      },
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('business:hscode:edit') || !hasAuth('business:hscode:remove')) {
            return null;
          }
          return <NDivider vertical />;
        };

        const editBtn = () => {
          if (!hasAuth('business:hscode:edit')) {
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
          if (!hasAuth('business:hscode:remove')) {
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
  handleEdit('id', id);
}

function handleExport() {
  download('/business/hscode/export', searchParams, `海关编码_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <HscodeSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="海关编码列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:hscode:add')"
          :show-delete="hasAuth('business:hscode:remove')"
          :show-export="hasAuth('business:hscode:export')"
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
        :scroll-x="1962"
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
