<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import {
  fetchCreateCustomerEnterprise,
  fetchUpdateCustomerEnterprise
} from '@/service/api/business/customer-enterprise';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CustomerEnterpriseOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.CustomerEnterprise | null;
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
    add: '新增企业海关备案信息库',
    edit: '编辑企业海关备案信息库'
  };
  return titles[props.operateType];
});

type Model = Api.Business.CustomerEnterpriseOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    departName: '',
    socialCode: '',
    departcd: '',
    ciqCode: '',
    aeo: '',
    creditRating: '',
    trrmOfValidity: '',
    cancellation: '',
    manageType: '',
    type: ''
  };
}

type RuleKey = Extract<keyof Model, 'id'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('流水号不能为空')
};

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const {
    id,
    departName,
    socialCode,
    departcd,
    ciqCode,
    aeo,
    creditRating,
    trrmOfValidity,
    cancellation,
    manageType,
    type
  } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCustomerEnterprise({
      departName,
      socialCode,
      departcd,
      ciqCode,
      aeo,
      creditRating,
      trrmOfValidity,
      cancellation,
      manageType,
      type
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCustomerEnterprise({
      id,
      departName,
      socialCode,
      departcd,
      ciqCode,
      aeo,
      creditRating,
      trrmOfValidity,
      cancellation,
      manageType,
      type
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
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem label="企业名称" path="departName">
          <NInput v-model:value="model.departName" placeholder="请输入企业名称" />
        </NFormItem>
        <NFormItem label="社会统一信用代码" path="socialCode">
          <NInput v-model:value="model.socialCode" placeholder="请输入社会统一信用代码" />
        </NFormItem>
        <NFormItem label="海关编码" path="departcd">
          <NInput v-model:value="model.departcd" placeholder="请输入海关编码" />
        </NFormItem>
        <NFormItem label="十位检验检疫编码" path="ciqCode">
          <NInput v-model:value="model.ciqCode" placeholder="请输入十位检验检疫编码" />
        </NFormItem>
        <NFormItem label="AEO代码" path="aeo">
          <NInput v-model:value="model.aeo" placeholder="请输入AEO代码" />
        </NFormItem>
        <NFormItem label="企业信用等级" path="creditRating">
          <NInput v-model:value="model.creditRating" placeholder="请输入企业信用等级" />
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
