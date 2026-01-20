<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreateHscode, fetchUpdateHscode } from '@/service/api/trade-compliance-library/hscode';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'HscodeOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.TradeComplianceLibrary.Hscode | null;
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
    add: '新增海关编码税则',
    edit: '编辑海关编码税则'
  };
  return titles[props.operateType];
});

type Model = Api.TradeComplianceLibrary.HscodeOperateParams;

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
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
    isEnable: null
  };
}

type RuleKey = Extract<keyof Model, 'id'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('ID不能为空')
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
  } = model.value;

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
      <NForm :model="model" :rules="rules">
        <NFormItem label="税号" path="hscode">
          <NInput v-model:value="model.hscode" placeholder="请输入商品税号" />
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
        <NFormItem label="法一名称" path="unit1name">
          <NInput v-model:value="model.unit1name" placeholder="请输入法一名称" />
        </NFormItem>
        <NFormItem label="法二单位" path="unit2">
          <NInput v-model:value="model.unit2" placeholder="请输入法二单位" />
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
        <NFormItem label="商检编码名称" path="ciqlist">
          <NInput v-model:value="model.ciqlist" :rows="3" type="textarea" placeholder="请输入商检编码名称" />
        </NFormItem>
        <NFormItem label="商检编码" path="ciqclass">
          <NInput v-model:value="model.ciqclass" :rows="3" type="textarea" placeholder="请输入商检编码" />
        </NFormItem>
        <NFormItem label="申报要素必填项" path="sbysRequired">
          <NInput v-model:value="model.sbysRequired" placeholder="请输入申报要素必填项" />
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
