<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CustomerEnterpriseSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Business.CustomerEnterpriseSearchParams>('model', { required: true });

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
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="130">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="企业名称" path="departName" class="pr-24px">
              <NInput v-model:value="model.departName" placeholder="请输入企业名称" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="社会统一信用代码" path="socialCode" class="pr-24px">
              <NInput v-model:value="model.socialCode" placeholder="请输入社会统一信用代码" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="海关编码" path="departcd" class="pr-24px">
              <NInput v-model:value="model.departcd" placeholder="请输入海关编码" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="十位检验检疫编码" path="ciqCode" class="pr-24px">
              <NInput v-model:value="model.ciqCode" placeholder="请输入十位检验检疫编码" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="AEO代码" path="aeo" class="pr-24px">
              <NInput v-model:value="model.aeo" placeholder="请输入AEO代码" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="企业信用等级" path="creditRating" class="pr-24px">
              <NInput v-model:value="model.creditRating" placeholder="请输入企业信用等级" @keyup.enter="search" />
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
