<script setup lang="ts">
import { toRaw } from 'vue';
import { jsonClone } from '@sa/utils';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'PnSearch'
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Business.PnSearchParams>('model', { required: true });

const defaultModel = jsonClone(toRaw(model.value));

function resetModel() {
  Object.assign(model.value, defaultModel);
}

async function reset() {
  await restoreValidation();
  resetModel();
  emit('search');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="business-pn-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="物料号" label-width="auto" path="partNumber" class="pr-24px">
              <NInput v-model:value="model.partNumber" placeholder="请输入物料号" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="供应商" label-width="auto" path="customerNo" class="pr-24px">
              <NInput v-model:value="model.customerNo" placeholder="请输入供应商" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="申报品名" label-width="auto" path="hsname" class="pr-24px">
              <NInput v-model:value="model.hsname" placeholder="请输入申报品名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="税号" label-width="auto" path="hscode" class="pr-24px">
              <NInput v-model:value="model.hscode" placeholder="请输入税号" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="申报要素" label-width="auto" path="hsmodel" class="pr-24px">
              <NInput v-model:value="model.hsmodel" placeholder="请输入申报要素" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="疫检代码" label-width="auto" path="ciqCode" class="pr-24px">
              <NInput v-model:value="model.ciqCode" placeholder="请输入疫检代码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="疫检名称" label-width="auto" path="ciqName" class="pr-24px">
              <NInput v-model:value="model.ciqName" placeholder="请输入疫检名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="型号规格" label-width="auto" path="model" class="pr-24px">
              <NInput v-model:value="model.model" placeholder="请输入型号规格" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="中文品名" label-width="auto" path="name" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="请输入中文品名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="英文品名" label-width="auto" path="enName" class="pr-24px">
              <NInput v-model:value="model.enName" placeholder="请输入英文品名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="英文描述" label-width="auto" path="enMemo" class="pr-24px">
              <NInput v-model:value="model.enMemo" placeholder="请输入英文描述" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="中文描述" label-width="auto" path="cnMemo" class="pr-24px">
              <NInput v-model:value="model.cnMemo" placeholder="请输入中文描述" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="单位" label-width="auto" path="unit" class="pr-24px">
              <NInput v-model:value="model.unit" placeholder="请输入单位" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="UN号" label-width="auto" path="un" class="pr-24px">
              <NInput v-model:value="model.un" placeholder="请输入UN号" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="原产国" label-width="auto" path="country" class="pr-24px">
              <NInput v-model:value="model.country" placeholder="请输入原产国" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="是否审核" label-width="auto" path="isAudited" class="pr-24px">
              <NInput v-model:value="model.isAudited" placeholder="请输入是否审核" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="商品类型" label-width="auto" path="partType" class="pr-24px">
              <NSelect v-model:value="model.partType" placeholder="请选择商品类型" :options="[]" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="待备案状态" label-width="auto" path="partStatus" class="pr-24px">
              <NSelect v-model:value="model.partStatus" placeholder="请选择待备案状态" :options="[]" clearable />
            </NFormItemGi>
            <NFormItemGi :show-feedback="false" span="24" class="pr-24px">
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
