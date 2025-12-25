<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreateCityports, fetchUpdateCityports } from '@/service/api/trade-compliance-library/cityports';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CityportsOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.TradeComplianceLibrary.Cityports | null;
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
    add: $t('page.tradeComplianceLibrary.cityports.addCityport'),
    edit: $t('page.tradeComplianceLibrary.cityports.editCityport')
  };
  return titles[props.operateType];
});

type Model = Api.TradeComplianceLibrary.CityportsOperateParams;

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    cityportCode: '',
    cnname: '',
    enname: ''
  };
}

type RuleKey = Extract<keyof Model, 'id' | 'cityportCode' | 'cnname' | 'enname'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule($t('page.tradeComplianceLibrary.cityports.form.id.invalid')),
  cityportCode: createRequiredRule($t('page.tradeComplianceLibrary.cityports.form.cityportCode.invalid')),
  cnname: createRequiredRule($t('page.tradeComplianceLibrary.cityports.form.cnname.invalid')),
  enname: createRequiredRule($t('page.tradeComplianceLibrary.cityports.form.enname.invalid'))
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

  const { id, cityportCode, cnname, enname } = model.value;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateCityports({ cityportCode, cnname, enname });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateCityports({ id, cityportCode, cnname, enname });
    if (error) return;
  }

  window.$message?.success($t(props.operateType === 'add' ? 'common.addSuccess' : 'common.updateSuccess'));
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
        <NFormItem :label="$t('page.tradeComplianceLibrary.cityports.cityportCode')" path="cityportCode">
          <NInput
            v-model:value="model.cityportCode"
            :placeholder="$t('page.tradeComplianceLibrary.cityports.form.cityportCode.required')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.tradeComplianceLibrary.cityports.cnname')" path="cnname">
          <NInput
            v-model:value="model.cnname"
            :placeholder="$t('page.tradeComplianceLibrary.cityports.form.cnname.required')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.tradeComplianceLibrary.cityports.enname')" path="enname">
          <NInput
            v-model:value="model.enname"
            :placeholder="$t('page.tradeComplianceLibrary.cityports.form.enname.required')"
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
