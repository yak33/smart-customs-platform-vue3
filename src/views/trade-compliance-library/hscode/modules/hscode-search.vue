<script setup lang="ts">
import { toRaw } from 'vue';
import { jsonClone } from '@sa/utils';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'HscodeSearch'
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.TradeComplianceLibrary.HscodeSearchParams>('model', { required: true });

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
      <NCollapseItem :title="$t('common.search')" name="trade-compliance-library-hscode-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="税号" label-width="auto" path="hscode" class="pr-24px">
              <NInput v-model:value="model.hscode" placeholder="请输入商品税号" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="商品名称" label-width="auto" path="gname" class="pr-24px">
              <NInput v-model:value="model.gname" placeholder="请输入商品名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="监管条件" label-width="auto" path="controLmark" class="pr-24px">
              <NInput v-model:value="model.controLmark" placeholder="请输入监管条件" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法一单位" label-width="auto" path="unit1" class="pr-24px">
              <NInput v-model:value="model.unit1" placeholder="请输入法一单位" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法一名称" label-width="auto" path="unit1name" class="pr-24px">
              <NInput v-model:value="model.unit1name" placeholder="请输入法一名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法二单位" label-width="auto" path="unit2" class="pr-24px">
              <NInput v-model:value="model.unit2" placeholder="请输入法二单位" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="法二名称" label-width="auto" path="unit2name" class="pr-24px">
              <NInput v-model:value="model.unit2name" placeholder="请输入法二名称" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              label="检验检疫条件"
              label-width="auto"
              path="inspmonitorcond"
              class="pr-24px"
            >
              <NInput v-model:value="model.inspmonitorcond" placeholder="请输入检验检疫条件" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="申报要素" label-width="auto" path="sbys" class="pr-24px">
              <NInput v-model:value="model.sbys" placeholder="请输入申报要素" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="商检编码名称" label-width="auto" path="ciqlist" class="pr-24px">
              <NInput v-model:value="model.ciqlist" placeholder="请输入商检编码名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="商检编码" label-width="auto" path="ciqclass" class="pr-24px">
              <NInput v-model:value="model.ciqclass" placeholder="请输入商检编码" />
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
