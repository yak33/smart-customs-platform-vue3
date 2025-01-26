<script setup lang="tsx">
import { ref, watch } from 'vue';
import { fetchAddProduct, fetchGetProductDetail, fetchUpdateProduct } from '@/service/api/goods';
defineOptions({
  name: 'ProductDetailModal'
});

const emit = defineEmits(['update:visible', 'submit']);

const props = defineProps<{
  id?: string; // 商品 ID（编辑模式下使用）
  operateType: 'add' | 'edit'; // 操作类型
  initialData?: Api.GoodsManage.Product; // 初始数据
}>();

// 使用 defineModel 简化双向绑定
const visible = defineModel<boolean>('visible', { required: true });

// 表单数据
const formData = ref<Api.GoodsManage.ProductEdit>({
  productName: '',
  productCode: '',
  price: 0,
  stock: 0,
  status: '0'
});

// 监听 ID 变化，加载数据
watch(
  () => props.id,
  async id => {
    if (id && props.operateType === 'edit') {
      const { data } = await fetchGetProductDetail(id);
      if (data) {
        formData.value = { ...data };
      }
    }
  },
  { immediate: true }
);

// 表单提交
async function handleSubmit() {
  try {
    if (props.operateType === 'add') {
      await fetchAddProduct(formData.value);
    } else if (props.operateType === 'edit' && props.id) {
      await fetchUpdateProduct(formData.value);
    }
    emit('submit'); // 通知父组件提交成功
    visible.value = false; // 关闭模态框
  } catch (error) {
    console.error('提交失败:', error);
  }
}
</script>

<template>
  <NModal v-model:show="visible" class="h-[80vh] w-4/5">
    <NCard :title="operateType === 'add' ? $t('common.add') : $t('common.edit')">
      <NForm>
        <NFormItem :label="$t('page.goods.product.productName')">
          <NInput v-model:value="formData.productName" />
        </NFormItem>
        <NFormItem :label="$t('page.goods.product.productCode')">
          <NInput v-model:value="formData.productCode" />
        </NFormItem>
        <NFormItem :label="$t('page.goods.product.price')">
          <NInputNumber v-model:value="formData.price" />
        </NFormItem>
        <NFormItem :label="$t('page.goods.product.stock')">
          <NInputNumber v-model:value="formData.stock" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NButton @click="visible = false">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </template>
    </NCard>
  </NModal>
</template>
