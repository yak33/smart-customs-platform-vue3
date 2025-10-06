<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateHscode, fetchUpdateHscode } from '@/service/api/business/hscode';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'HscodeOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Hscode | null;
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
    add: '新增海关编码',
    edit: '编辑海关编码'
  };
  return titles[props.operateType];
});

type Model = Api.Business.HscodeOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    hscode: '',
    gname: '',
    controLmark: '',
    unit1: '',
    unit1name: '',
    unit2: '',
    unit2name: '',
    inspmonitorcond: '',
    notes: '',
    sbys: '',
    ciqlist: '',
    ciqclass: '',
    sbysRequired: '',
    isEnable: undefined
  };
}

type RuleKey = Extract<
  keyof Model,
  | 'hscode'
  | 'gname'
  | 'isEnable'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  hscode: createRequiredRule('税号不能为空'),
  gname: createRequiredRule('商品名称不能为空'),
  isEnable: createRequiredRule('是否启用不能为空')
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
    hscode,
    gname,
    controLmark,
    unit1,
    unit1name,
    unit2,
    unit2name,
    inspmonitorcond,
    notes,
    sbys,
    ciqlist,
    ciqclass,
    sbysRequired,
    isEnable
  } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateHscode({
      hscode,
      gname,
      controLmark,
      unit1,
      unit1name,
      unit2,
      unit2name,
      inspmonitorcond,
      notes,
      sbys,
      ciqlist,
      ciqclass,
      sbysRequired,
      isEnable
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateHscode({
      id,
      hscode,
      gname,
      controLmark,
      unit1,
      unit1name,
      unit2,
      unit2name,
      inspmonitorcond,
      notes,
      sbys,
      ciqlist,
      ciqclass,
      sbysRequired,
      isEnable
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
        <NFormItem label="税号" path="hscode">
          <NInput v-model:value="model.hscode" placeholder="请输入税号" />
        </NFormItem>
        <NFormItem label="商品名称" path="gname">
          <NInput v-model:value="model.gname" placeholder="请输入商品名称" />
        </NFormItem>
        <NFormItem label="监管条件" path="controLmark">
          <NInput v-model:value="model.controLmark" placeholder="请输入监管条件" />
        </NFormItem>
        <NFormItem label="法一单位" path="unit1">
          <NInput v-model:value="model.unit1" placeholder="请输入法一单位" />
        </NFormItem>
        <NFormItem label="法一单位名称" path="unit1name">
          <NInput v-model:value="model.unit1name" placeholder="请输入法一单位名称" />
        </NFormItem>
        <NFormItem label="法二" path="unit2">
          <NInput v-model:value="model.unit2" placeholder="请输入法二" />
        </NFormItem>
        <NFormItem label="法二名称" path="unit2name">
          <NInput v-model:value="model.unit2name" placeholder="请输入法二名称" />
        </NFormItem>
        <NFormItem label="检验检疫条件" path="inspmonitorcond">
          <NInput v-model:value="model.inspmonitorcond" placeholder="请输入检验检疫条件" />
        </NFormItem>
        <NFormItem label="备注" path="notes">
          <NInput v-model:value="model.notes" :rows="3" type="textarea" placeholder="请输入备注" />
        </NFormItem>
        <NFormItem label="申报要素" path="sbys">
          <NInput v-model:value="model.sbys" :rows="3" type="textarea" placeholder="请输入申报要素" />
        </NFormItem>
        <NFormItem label="商检编码：名称" path="ciqlist">
          <NInput v-model:value="model.ciqlist" :rows="3" type="textarea" placeholder="请输入商检编码：名称" />
        </NFormItem>
        <NFormItem label="商检编码" path="ciqclass">
          <NInput v-model:value="model.ciqclass" :rows="3" type="textarea" placeholder="请输入商检编码" />
        </NFormItem>
        <NFormItem label="申报要素必填项" path="sbysRequired">
          <NInput v-model:value="model.sbysRequired" placeholder="请输入申报要素必填项" />
        </NFormItem>
        <NFormItem label="是否启用" path="isEnable">
          <NSelect v-model:value="model.isEnable" :options="enabledOptions" placeholder="请选择是否启用" />
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
