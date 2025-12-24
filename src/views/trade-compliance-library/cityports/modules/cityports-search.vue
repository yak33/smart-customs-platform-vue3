<script setup lang="ts">
import { toRaw } from 'vue';
import { jsonClone } from '@sa/utils';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CityportsSearch'
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.TradeComplianceLibrary.CityportsSearchParams>('model', { required: true });

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
      <NCollapseItem :title="$t('common.search')" name="TradeComplianceLibrary-cityports-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.tradeComplianceLibrary.cityports.cityportCode')"
              path="cityportCode"
              class="pr-24px"
            >
              <NInput
                v-model:value="model.cityportCode"
                :placeholder="$t('page.tradeComplianceLibrary.cityports.form.cityportCode.required')"
                @keyup.enter="search"
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.tradeComplianceLibrary.cityports.cnname')"
              path="cnname"
              class="pr-24px"
            >
              <NInput
                v-model:value="model.cnname"
                :placeholder="$t('page.tradeComplianceLibrary.cityports.form.cnname.required')"
                @keyup.enter="search"
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.tradeComplianceLibrary.cityports.enname')"
              path="enname"
              class="pr-24px"
            >
              <NInput
                v-model:value="model.enname"
                :placeholder="$t('page.tradeComplianceLibrary.cityports.form.enname.required')"
                @keyup.enter="search"
              />
            </NFormItemGi>
            <NFormItemGi :show-feedback="false" span="24 s:12 m:6" class="pr-24px">
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
