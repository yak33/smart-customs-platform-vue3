<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'GoodsSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Business.GoodsSearchParams>('model', { required: true });

async function reset() {
  Object.assign(model.value.params!, {});
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="所属企业ID" path="ownerId" class="pr-24px">
              <NInput v-model:value="model.ownerId" placeholder="请输入所属企业ID" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="商品类型" path="partType" class="pr-24px">
              <NSelect
                v-model:value="model.partType"
                placeholder="请选择商品类型"
                :options="[
                  { label: '原材料', value: '1' },
                  { label: '辅料', value: '2' },
                  { label: '成品', value: '3' },
                  { label: '半成品', value: '4' },
                  { label: '商品', value: '5' }
                ]"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="物料号" path="partNumber" class="pr-24px">
              <NInput v-model:value="model.partNumber" placeholder="请输入物料号" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="供应商" path="customerNo" class="pr-24px">
              <NInput v-model:value="model.customerNo" placeholder="请输入供应商" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="附加码" path="additionalCode" class="pr-24px">
              <NInput v-model:value="model.additionalCode" placeholder="请输入附加码" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="申报品名" path="hsname" class="pr-24px">
              <NInput v-model:value="model.hsname" placeholder="请输入申报品名" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="税号" path="hscode" class="pr-24px">
              <NInput v-model:value="model.hscode" placeholder="请输入税号" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="申报要素" path="hsmodel" class="pr-24px">
              <NInput v-model:value="model.hsmodel" placeholder="请输入申报要素" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="疫检代码" path="ciqCode" class="pr-24px">
              <NInput v-model:value="model.ciqCode" placeholder="请输入疫检代码" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="疫检名称" path="ciqName" class="pr-24px">
              <NInput v-model:value="model.ciqName" placeholder="请输入疫检名称" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="型号规格" path="model" class="pr-24px">
              <NInput v-model:value="model.model" placeholder="请输入型号规格" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="中文品名" path="name" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="请输入中文品名" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="英文品名" path="enName" class="pr-24px">
              <NInput v-model:value="model.enName" placeholder="请输入英文品名" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="英文描述" path="enMemo" class="pr-24px">
              <NInput v-model:value="model.enMemo" placeholder="请输入英文描述" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="中文描述" path="cnMemo" class="pr-24px">
              <NInput v-model:value="model.cnMemo" placeholder="请输入中文描述" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="客户确认" path="customerConfirm" class="pr-24px">
              <NSelect
                v-model:value="model.customerConfirm"
                placeholder="请选择客户确认状态"
                :options="[
                  { label: '是', value: 1 },
                  { label: '否', value: 0 }
                ]"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="是否审核" path="isAudited" class="pr-24px">
              <NSelect
                v-model:value="model.isAudited"
                placeholder="请选择是否审核"
                :options="[
                  { label: '是', value: 1 },
                  { label: '否', value: 0 }
                ]"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="备案状态" path="partStatus" class="pr-24px">
              <NSelect
                v-model:value="model.partStatus"
                placeholder="请选择备案状态"
                :options="[
                  { label: '已标记', value: 1 },
                  { label: '未标记', value: 0 }
                ]"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
