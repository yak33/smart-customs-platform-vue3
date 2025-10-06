<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateCountries, fetchUpdateCountries } from '@/service/api/business/countries';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CountriesOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Countries | null;
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

// 启用状态选项
const enabledOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
];

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增国家',
    edit: '编辑国家'
  };
  return titles[props.operateType];
});

type Model = Api.Business.CountriesOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    code: undefined,
    name: undefined,
    standardCode: undefined,
    enname: undefined,
    isenabled: 1 // 默认启用
  };
}

type RuleKey = Extract<keyof Model, 'code' | 'name' | 'isenabled' | 'tenantId' | 'delFlag'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  code: createRequiredRule('国家编码不能为空'),
  name: createRequiredRule('国家名称不能为空'),
  isenabled: createRequiredRule('是否启用不能为空')
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

  const { code, name, standardCode, enname, isenabled, id } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCountries({ code, name, standardCode, enname, isenabled });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCountries({ code, name, standardCode, enname, isenabled, id });
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
        <NFormItem label="国家编码" path="code">
          <NInput v-model:value="model.code" placeholder="请输入国家编码" />
        </NFormItem>
        <NFormItem label="国家名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入国家名称" />
        </NFormItem>
        <NFormItem label="自定义代码" path="standardCode">
          <NInput v-model:value="model.standardCode" placeholder="请输入自定义代码" />
        </NFormItem>
        <NFormItem label="国家英文名称" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入国家英文名称" />
        </NFormItem>
        <NFormItem label="是否启用" path="isenabled">
          <NSelect v-model:value="model.isenabled" :options="enabledOptions" placeholder="请选择是否启用" />
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
