<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreateCurrencies, fetchUpdateCurrencies } from '@/service/api/trade-compliance-library/currencies';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CurrenciesOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.TradeComplianceLibrary.Currencies | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { validate, restoreValidation } = useNaiveForm();
const { createRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增币制',
    edit: '编辑币制'
  };
  return titles[props.operateType];
});

type Model = Api.TradeComplianceLibrary.CurrenciesOperateParams;

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    code: '',
    currency: '',
    name: '',
    enname: '',
    currencyOrder: null,
    rate: '',
    thresholdLow: null,
    thresholdHigh: null
  };
}

type RuleKey = Extract<keyof Model, 'id' | 'code' | 'currency' | 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('主键不能为空'),
  code: createRequiredRule('编码 110等不能为空'),
  currency: createRequiredRule('开证币种 USD/CYN等不能为空'),
  name: createRequiredRule('币种名称不能为空')
};

function handleUpdateModelWhenEdit() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, jsonClone(props.rowData));
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const { id, code, currency, name, enname, currencyOrder, rate, thresholdLow, thresholdHigh } = model.value;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCurrencies({
      code,
      currency,
      name,
      enname,
      currencyOrder,
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
      currencyOrder,
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
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm :model="model" :rules="rules">
        <NFormItem label="币种编码" path="code">
          <NInput v-model:value="model.code" placeholder="请输入币种编码" />
        </NFormItem>
        <NFormItem label="开证币种" path="currency">
          <NInput v-model:value="model.currency" placeholder="请输入开证币种" />
        </NFormItem>
        <NFormItem label="币种名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入币种名称" />
        </NFormItem>
        <NFormItem label="币种英文名称" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入币种英文名称" />
        </NFormItem>
        <NFormItem label="汇率" path="rate">
          <NInput v-model:value="model.rate" placeholder="请输入汇率" />
        </NFormItem>
        <NFormItem label="阀值低" path="thresholdLow">
          <NInputNumber v-model:value="model.thresholdLow" placeholder="请输入阀值低" class="w-full" />
        </NFormItem>
        <NFormItem label="阀值高" path="thresholdHigh">
          <NInputNumber v-model:value="model.thresholdHigh" placeholder="请输入阀值高" class="w-full" />
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
