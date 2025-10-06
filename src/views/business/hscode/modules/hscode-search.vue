<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'HscodeSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Business.HscodeSearchParams>('model', { required: true });

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
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="100">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="税号" path="hscode" class="pr-24px">
              <NInput v-model:value="model.hscode" placeholder="请输入税号" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="商品名称" path="gname" class="pr-24px">
              <NInput v-model:value="model.gname" placeholder="请输入商品名称" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法一单位" path="unit1" class="pr-24px">
              <NInput v-model:value="model.unit1" placeholder="请输入法一单位" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法一单位名称" path="unit1name" class="pr-24px">
              <NInput v-model:value="model.unit1name" placeholder="请输入法一单位名称" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法二" path="unit2" class="pr-24px">
              <NInput v-model:value="model.unit2" placeholder="请输入法二" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法二名称" path="unit2name" class="pr-24px">
              <NInput v-model:value="model.unit2name" placeholder="请输入法二名称" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="监管条件" path="controLmark" class="pr-24px">
              <NInput v-model:value="model.controLmark" placeholder="请输入监管条件" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="检验检疫条件" path="inspmonitorcond" class="pr-24px">
              <NInput v-model:value="model.inspmonitorcond" placeholder="请输入检验检疫条件" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="申报要素" path="sbys" class="pr-24px">
              <NInput v-model:value="model.sbys" placeholder="请输入申报要素" @keyup.enter="search" />
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
