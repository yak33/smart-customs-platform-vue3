<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreateCountries, fetchUpdateCountries } from '@/service/api/trade-compliance-library/countries';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CountriesOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.TradeComplianceLibrary.Countries | null;
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
    add: '新增国家',
    edit: '编辑国家'
  };
  return titles[props.operateType];
});

type Model = Omit<Api.TradeComplianceLibrary.CountriesOperateParams, 'isenabled'> & {
  isenabled: 'true' | 'false' | null;
};

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    code: '',
    name: '',
    standardCode: '',
    enname: '',
    isenabled: null,
    id: '',
    warnLevel: ''
  };
}

type RuleKey = Extract<keyof Model, 'code' | 'name' | 'enname' | 'id'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  code: createRequiredRule('国家编码不能为空'),
  name: createRequiredRule('国家名称不能为空'),
  enname: createRequiredRule('国家英文名称不能为空'),
  id: createRequiredRule('主键不能为空')
};

const warnLevelOptions: CommonType.Option<string>[] = [
  { value: '1', label: '低' },
  { value: '2', label: '中' },
  { value: '3', label: '高' }
];

const enableOptions = [
  { value: 'true', label: '是' },
  { value: 'false', label: '否' }
];

function boolToStr(val: boolean | null | undefined): 'true' | 'false' | null {
  if (val === null || val === undefined) return null;
  return val ? 'true' : 'false';
}

function strToBool(val: 'true' | 'false' | null): boolean | null {
  if (val === null) return null;
  return val === 'true';
}

function handleUpdateModelWhenEdit() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    const clonedData = jsonClone(props.rowData);
    // 将布尔值转为字符串以便在 Select 中显示
    const isenabledStr = boolToStr(clonedData.isenabled);
    Object.assign(model.value, { ...clonedData, isenabled: isenabledStr });
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const { code, name, standardCode, enname, isenabled, id, warnLevel } = model.value;

  // 将字符串转为布尔值
  const isenabledBoolean = strToBool(isenabled);

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCountries({
      code,
      name,
      standardCode,
      enname,
      isenabled: isenabledBoolean,
      warnLevel
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCountries({
      code,
      name,
      standardCode,
      enname,
      isenabled: isenabledBoolean,
      id,
      warnLevel
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
        <NFormItem label="国家编码" path="code">
          <NInput v-model:value="model.code" placeholder="请输入国家编码" />
        </NFormItem>
        <NFormItem label="国家名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入国家名称" />
        </NFormItem>
        <NFormItem label="国家英文名称" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入国家英文名称" />
        </NFormItem>
        <NFormItem label="自定义代码" path="standardCode">
          <NInput v-model:value="model.standardCode" placeholder="请输入自定义代码" />
        </NFormItem>
        <NFormItem label="是否启用" path="isenabled">
          <NSelect v-model:value="model.isenabled" placeholder="请选择是否启用" :options="enableOptions" clearable />
        </NFormItem>
        <NFormItem label="预警级别" path="warnLevel">
          <NSelect v-model:value="model.warnLevel" placeholder="请选择预警级别" :options="warnLevelOptions" clearable />
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
