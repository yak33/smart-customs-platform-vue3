<script setup lang="ts">
import { toRaw } from 'vue';
import { jsonClone } from '@sa/utils';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CurrenciesSearch'
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.TradeComplianceLibrary.CurrenciesSearchParams>('model', { required: true });

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
      <NCollapseItem :title="$t('common.search')" name="trade-compliance-library-currencies-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="币种编码" label-width="auto" path="code" class="pr-24px">
              <NInput v-model:value="model.code" placeholder="请输入币种编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="开证币种" label-width="auto" path="currency" class="pr-24px">
              <NInput v-model:value="model.currency" placeholder="请输入开证币种" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="币种名称" label-width="auto" path="name" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="请输入币种名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="币种英文名称" label-width="auto" path="enname" class="pr-24px">
              <NInput v-model:value="model.enname" placeholder="请输入币种英文名称" />
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
