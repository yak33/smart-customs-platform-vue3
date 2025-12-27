<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreateChinaPorts, fetchUpdateChinaPorts } from '@/service/api/trade-compliance-library/china-ports';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'ChinaPortsOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.TradeComplianceLibrary.ChinaPorts | null;
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
    add: '新增口岸信息',
    edit: '编辑口岸信息'
  };
  return titles[props.operateType];
});

type Model = Api.TradeComplianceLibrary.ChinaPortsOperateParams;

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    chinaPortCode: '',
    name: '',
    enname: ''
  };
}

type RuleKey = Extract<keyof Model, 'id' | 'chinaPortCode' | 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('ID不能为空'),
  chinaPortCode: createRequiredRule('口岸编码不能为空'),
  name: createRequiredRule('口岸名称不能为空')
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

  const { id, chinaPortCode, name, enname } = model.value;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateChinaPorts({ chinaPortCode, name, enname });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateChinaPorts({ id, chinaPortCode, name, enname });
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
        <NFormItem label="口岸编码" path="chinaPortCode">
          <NInput v-model:value="model.chinaPortCode" placeholder="请输入口岸编码" />
        </NFormItem>
        <NFormItem label="口岸名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入口岸名称" />
        </NFormItem>
        <NFormItem label="口岸英文名称" path="enname">
          <NInput v-model:value="model.enname" placeholder="请输入口岸英文名称" />
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
