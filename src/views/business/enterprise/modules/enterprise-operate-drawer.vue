<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreateEnterprise, fetchUpdateEnterprise } from '@/service/api/business/enterprise';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'EnterpriseOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Enterprise | null;
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
    add: '新增企业海关备案信息',
    edit: '编辑企业海关备案信息'
  };
  return titles[props.operateType];
});

type Model = Omit<Api.Business.EnterpriseOperateParams, 'id'> & { id: string };

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    departName: '',
    socialCode: '',
    departcd: '',
    ciqCode: '',
    aeo: '',
    creditRating: '',
    trrmOfValidity: '',
    cancellation: '',
    manageType: ''
  };
}

type RuleKey = Extract<keyof Model, 'id'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('流水号不能为空')
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

  const { id, departName, socialCode, departcd, ciqCode, aeo, creditRating, trrmOfValidity, cancellation, manageType } =
    model.value;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateEnterprise({
      departName,
      socialCode,
      departcd,
      ciqCode,
      aeo,
      creditRating,
      trrmOfValidity,
      cancellation,
      manageType
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateEnterprise({
      id,
      departName,
      socialCode,
      departcd,
      ciqCode,
      aeo,
      creditRating,
      trrmOfValidity,
      cancellation,
      manageType
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
        <NFormItem label="有效期" path="trrmOfValidity">
          <NInput v-model:value="model.trrmOfValidity" placeholder="请输入有效期" />
        </NFormItem>
        <NFormItem label="注销" path="cancellation">
          <NInput v-model:value="model.cancellation" placeholder="请输入注销" />
        </NFormItem>
        <NFormItem label="经营类别" path="manageType">
          <NSelect
            v-model:value="model.manageType"
            placeholder="请选择经营类别"
            :options="[{ value: '0', label: '请选择字典生成' }]"
            clearable
          />
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
