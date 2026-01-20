<script setup lang="ts">
import { toRaw } from 'vue';
import { jsonClone } from '@sa/utils';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'EnterpriseSearch'
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Business.EnterpriseSearchParams>('model', { required: true });

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
      <NCollapseItem :title="$t('common.search')" name="business-enterprise-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="企业名称" label-width="auto" path="departName" class="pr-24px">
              <NInput v-model:value="model.departName" placeholder="请输入企业名称" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              label="社会统一信用代码"
              label-width="auto"
              path="socialCode"
              class="pr-24px"
            >
              <NInput v-model:value="model.socialCode" placeholder="请输入社会统一信用代码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="海关编码" label-width="auto" path="departcd" class="pr-24px">
              <NInput v-model:value="model.departcd" placeholder="请输入海关编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="十位检验检疫编码" label-width="auto" path="ciqCode" class="pr-24px">
              <NInput v-model:value="model.ciqCode" placeholder="请输入十位检验检疫编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="AEO代码" label-width="auto" path="aeo" class="pr-24px">
              <NInput v-model:value="model.aeo" placeholder="请输入AEO代码" />
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
