<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateCustomsPorts, fetchUpdateCustomsPorts } from '@/service/api/business/customs-ports';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CustomsPortsOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.CustomsPorts | null;
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
    add: '新增关区口岸',
    edit: '编辑关区口岸'
  };
  return titles[props.operateType];
});

type Model = Api.Business.CustomsPortsOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    customsPortCode: '',
    name: '',
    langName: ''
  };
}

type RuleKey = Extract<keyof Model, 'customsPortCode' | 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  customsPortCode: createRequiredRule('关区编码不能为空'),
  name: createRequiredRule('关区名称不能为空')
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

  const { id, customsPortCode, name, langName } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCustomsPorts({ customsPortCode, name, langName });
    if (error) return;
    window.$message?.success($t('common.addSuccess'));
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCustomsPorts({ id, customsPortCode, name, langName });
    if (error) return;
    window.$message?.success($t('common.updateSuccess'));
  }

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
        <NFormItem label="关区编码" path="customsPortCode">
          <NInput v-model:value="model.customsPortCode" placeholder="请输入关区编码" />
        </NFormItem>
        <NFormItem label="关区名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入关区名称" />
        </NFormItem>
        <NFormItem label="关区全称" path="langName">
          <NInput v-model:value="model.langName" placeholder="请输入关区全称" />
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
