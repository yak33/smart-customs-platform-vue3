<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateCurrencies, fetchUpdateCurrencies } from '@/service/api/business/currencies';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CurrenciesOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Currencies | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { createRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增币制',
    edit: '编辑币制'
  };
  return titles[props.operateType];
});

type Model = Api.Business.CurrenciesOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    code: null,
    currency: null,
    name: null,
    enname: null,
    rate: null,
    thresholdLow: null,
    thresholdHigh: null
  };
}

type RuleKey = Extract<keyof Model, 'code' | 'currency' | 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  code: createRequiredRule('币制编码不能为空'),
  currency: createRequiredRule('币制不能为空'),
  name: createRequiredRule('币制名称不能为空')
};

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const { id, code, currency, name, enname, rate, thresholdLow, thresholdHigh } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCurrencies({
      code,
      currency,
      name,
      enname,
      rate,
      thresholdLow,
      thresholdHigh
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCurrencies({
      id,
      code,
      currency,
      name,
      enname,
      rate,
      thresholdLow,
      thresholdHigh
    });
    if (error) return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    if (props.operateType === 'add') {
      Object.assign(model, createDefaultModel());
    } else if (props.operateType === 'edit' && props.rowData) {
      Object.assign(model, props.rowData);
    }
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem label="币制编码" path="code">
          <NInput v-model:value="model.code" placeholder="请输入币制编码" />
        </NFormItem>
        <NFormItem label="币制" path="currency">
          <NInput v-model:value="model.currency" placeholder="请输入币制" />
        </NFormItem>
        <NFormItem label="币制名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入币制名称" />
        </NFormItem>
        <NFormItem label="币制英文名称" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入币制英文名称" />
        </NFormItem>
        <NFormItem label="汇率" path="rate">
          <NInput v-model:value="model.rate" placeholder="请输入汇率" />
        </NFormItem>
        <NFormItem label="阀值低" path="thresholdLow">
          <NInputNumber v-model:value="model.thresholdLow" placeholder="请输入阀值低" :precision="2" />
        </NFormItem>
        <NFormItem label="阀值高" path="thresholdHigh">
          <NInputNumber v-model:value="model.thresholdHigh" placeholder="请输入阀值高" :precision="2" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
