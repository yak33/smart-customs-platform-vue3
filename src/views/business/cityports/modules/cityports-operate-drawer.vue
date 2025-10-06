<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateCityports, fetchUpdateCityports } from '@/service/api/business/cityports';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CityportsOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Cityports | null;
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
    add: '新增港口',
    edit: '编辑港口'
  };
  return titles[props.operateType];
});

type Model = Api.Business.CityportsOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    cityportCode: '',
    cnname: '',
    enname: ''
  };
}

type RuleKey = Extract<keyof Model, 'cityportCode' | 'cnname'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  cityportCode: createRequiredRule('编码不能为空'),
  cnname: createRequiredRule('中文名不能为空')
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

  const { id, cityportCode, cnname, enname } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCityports({ cityportCode, cnname, enname });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCityports({ id, cityportCode, cnname, enname });
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
        <NFormItem label="编码" path="cityportCode">
          <NInput v-model:value="model.cityportCode" placeholder="请输入编码" />
        </NFormItem>
        <NFormItem label="中文名" path="cnname">
          <NInput v-model:value="model.cnname" placeholder="请输入中文名" />
        </NFormItem>
        <NFormItem label="英文名" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入英文名" />
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
