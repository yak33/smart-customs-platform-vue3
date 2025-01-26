<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteProduct, fetchGetProductList } from '@/service/api/goods';
import { useDict } from '@/hooks/business/dict';
import { useAuth } from '@/hooks/business/auth';
import { transDeleteParams } from '@/utils/common';
import { formatDateTime } from '@/utils/date';
import ProductSearch from './modules/product-search.vue';
import ProductDetailModal from './modules/product-detail-modal.vue';

defineOptions({
  name: 'ProductListPage'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

const { bool: modalVisible, setTrue: openModalVisible } = useBoolean();

type Product = Api.GoodsManage.Product;

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetProductList,
  apiParams: {
    page: 1,
    pageSize: 20,
    productName: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,
      fixed: 'left'
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'productName',
      title: $t('page.goods.product.productName'),
      align: 'center',
      width: 120
    },
    {
      key: 'productCode',
      title: $t('page.goods.product.productCode'),
      align: 'center',
      width: 120
    },
    {
      key: 'price',
      title: $t('page.goods.product.price'),
      align: 'center',
      width: 100
    },
    {
      key: 'stock',
      title: $t('page.goods.product.stock'),
      align: 'center',
      width: 100
    },
    {
      key: 'status',
      title: $t('page.goods.product.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'center',
      width: 200,
      render: row => formatDateTime(row.createTime)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 200,
      fixed: 'right',
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('product:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('product:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" quaternary size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const { checkedRowKeys, handleData, editingData, operateType, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

async function handleDelete(id: string) {
  const { error, data: result } = await fetchDeleteProduct(transDeleteParams([id]));
  if (!error && result) {
    await onDeleted();
  }
}

function handleAdd() {
  operateType.value = 'add';
  openModalVisible();
}

function edit(id: string) {
  handleData(id);
  operateType.value = 'edit';
  openModalVisible();
}

async function handleBatchDelete() {
  const { error, data: result } = await fetchDeleteProduct(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}

function handleSubmit() {
  getData(); // 重新加载表格数据
  window.$message?.success(operateType.value === 'add' ? $t('common.addSuccess') : $t('common.updateSuccess'));
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <ProductSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="goods:add"
        delete-auth="goods:delete"
        @refresh="getData"
        @add="handleAdd"
        @delete="handleBatchDelete"
      />
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="(row: Product) => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
    <ProductDetailModal
      :id="editingData?.id"
      v-model:visible="modalVisible"
      :operate-type="operateType"
      :product-name="editingData?.productName"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped></style>
