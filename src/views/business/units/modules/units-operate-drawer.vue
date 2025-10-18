<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateUnits, fetchUpdateUnits } from '@/service/api/business/units';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'UnitsOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Units | null;
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
    add: '新增货物单位编码',
    edit: '编辑货物单位编码'
  };
  return titles[props.operateType];
});

type Model = Api.Business.UnitsOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    code: '',
    name: '',
    itemKey: '',
    enname: ''
  };
}

type RuleKey = Extract<keyof Model, 'id' | 'code' | 'name' | 'enname'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('主键不能为空'),
  code: createRequiredRule('单位编码不能为空'),
  name: createRequiredRule('单位名称不能为空'),
  enname: createRequiredRule('单位英文名称不能为空')
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

  const { id, code, name, itemKey, enname } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateUnits({ code, name, itemKey, enname });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateUnits({ id, code, name, itemKey, enname });
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
        <NFormItem label="单位编码" path="code">
          <NInput v-model:value="model.code" placeholder="请输入单位编码" />
        </NFormItem>
        <NFormItem label="单位名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入单位名称" />
        </NFormItem>
        <NFormItem label="英文代码" path="itemKey">
          <NInput v-model:value="model.itemKey" placeholder="请输入英文代码" />
        </NFormItem>
        <NFormItem label="单位英文名称" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入单位英文名称" />
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
