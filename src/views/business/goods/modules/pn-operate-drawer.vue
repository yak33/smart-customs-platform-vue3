<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
import { fetchCreatePn, fetchUpdatePn } from '@/service/api/business/goodsPn';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'PnOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Pn | null;
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
    add: '新增商品库',
    edit: '编辑商品库'
  };
  return titles[props.operateType];
});

type Model = Api.Business.PnOperateParams;

const formData = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    ownerId: '',
    partNumber: '',
    customerNo: '',
    additionalCode: '',
    hsname: '',
    hscode: '',
    hsmodel: '',
    ciqCode: '',
    ciqName: '',
    hsmemo: '',
    model: '',
    name: '',
    enName: '',
    enMemo: '',
    cnMemo: '',
    unit: '',
    pack: '',
    danger: '',
    dangerLevel: '',
    un: '',
    chemicalsNo: '',
    price: null,
    country: '',
    netWeight: null,
    customerConfirm: '',
    isAudited: '',
    isChecked: '',
    attachments: '',
    partType: '',
    partStatus: '',
    updateRemark: '',
    remark: '',
    createDate: null,
    lastUpdateBy: '',
    lastUpdateDate: null
  };
}

type RuleKey = Extract<keyof Model, 'id' | 'tenantId' | 'ownerId' | 'partNumber'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  id: createRequiredRule('商品流水号不能为空'),
  ownerId: createRequiredRule('所属企业租户ID不能为空'),
  partNumber: createRequiredRule('物料号不能为空')
};

function handleUpdateModelWhenEdit() {
  formData.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(formData.value, jsonClone(props.rowData));
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const {
    id,
    ownerId,
    partNumber,
    customerNo,
    additionalCode,
    hsname,
    hscode,
    hsmodel,
    ciqCode,
    ciqName,
    hsmemo,
    model,
    name,
    enName,
    enMemo,
    cnMemo,
    unit,
    pack,
    danger,
    dangerLevel,
    un,
    chemicalsNo,
    price,
    country,
    netWeight,
    customerConfirm,
    isAudited,
    isChecked,
    attachments,
    partType,
    partStatus,
    updateRemark,
    remark,
    createDate,
    lastUpdateBy,
    lastUpdateDate
  } = formData.value;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreatePn({
      ownerId,
      partNumber,
      customerNo,
      additionalCode,
      hsname,
      hscode,
      hsmodel,
      ciqCode,
      ciqName,
      hsmemo,
      model,
      name,
      enName,
      enMemo,
      cnMemo,
      unit,
      pack,
      danger,
      dangerLevel,
      un,
      chemicalsNo,
      price,
      country,
      netWeight,
      customerConfirm,
      isAudited,
      isChecked,
      attachments,
      partType,
      partStatus,
      updateRemark,
      remark,
      createDate,
      lastUpdateBy,
      lastUpdateDate
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdatePn({
      id,
      ownerId,
      partNumber,
      customerNo,
      additionalCode,
      hsname,
      hscode,
      hsmodel,
      ciqCode,
      ciqName,
      hsmemo,
      model,
      name,
      enName,
      enMemo,
      cnMemo,
      unit,
      pack,
      danger,
      dangerLevel,
      un,
      chemicalsNo,
      price,
      country,
      netWeight,
      customerConfirm,
      isAudited,
      isChecked,
      attachments,
      partType,
      partStatus,
      updateRemark,
      remark,
      createDate,
      lastUpdateBy,
      lastUpdateDate
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
      <NForm :model="formData" :rules="rules">
        <NFormItem label="所属企业" path="ownerId">
          <NInput v-model:value="formData.ownerId" placeholder="请输入所属企业" />
        </NFormItem>
        <NFormItem label="物料号" path="partNumber">
          <NInput v-model:value="formData.partNumber" placeholder="请输入物料号" />
        </NFormItem>
        <NFormItem label="供应商" path="customerNo">
          <NInput v-model:value="formData.customerNo" placeholder="请输入供应商" />
        </NFormItem>
        <NFormItem label="附加码" path="additionalCode">
          <NInput v-model:value="formData.additionalCode" placeholder="请输入附加码" />
        </NFormItem>
        <NFormItem label="申报品名" path="hsname">
          <NInput v-model:value="formData.hsname" placeholder="请输入申报品名" />
        </NFormItem>
        <NFormItem label="税号" path="hscode">
          <NInput v-model:value="formData.hscode" placeholder="请输入税号" />
        </NFormItem>
        <NFormItem label="申报要素" path="hsmodel">
          <NInput v-model:value="formData.hsmodel" placeholder="请输入申报要素" />
        </NFormItem>
        <NFormItem label="疫检代码" path="ciqCode">
          <NInput v-model:value="formData.ciqCode" placeholder="请输入疫检代码" />
        </NFormItem>
        <NFormItem label="疫检名称" path="ciqName">
          <NInput v-model:value="formData.ciqName" placeholder="请输入疫检名称" />
        </NFormItem>
        <NFormItem label="申报要素备注" path="hsmemo">
          <NInput v-model:value="formData.hsmemo" :rows="3" type="textarea" placeholder="请输入申报要素备注" />
        </NFormItem>
        <NFormItem label="型号规格" path="model">
          <NInput v-model:value="formData.model" placeholder="请输入型号规格" />
        </NFormItem>
        <NFormItem label="中文品名" path="name">
          <NInput v-model:value="formData.name" placeholder="请输入中文品名" />
        </NFormItem>
        <NFormItem label="英文品名" path="enName">
          <NInput v-model:value="formData.enName" placeholder="请输入英文品名" />
        </NFormItem>
        <NFormItem label="英文描述" path="enMemo">
          <NInput v-model:value="formData.enMemo" placeholder="请输入英文描述" />
        </NFormItem>
        <NFormItem label="中文描述" path="cnMemo">
          <NInput v-model:value="formData.cnMemo" placeholder="请输入中文描述" />
        </NFormItem>
        <NFormItem label="单位" path="unit">
          <NInput v-model:value="formData.unit" placeholder="请输入单位" />
        </NFormItem>
        <NFormItem label="包装" path="pack">
          <NInput v-model:value="formData.pack" placeholder="请输入包装" />
        </NFormItem>
        <NFormItem label="是否危品" path="danger">
          <NInput v-model:value="formData.danger" placeholder="请输入是否危品" />
        </NFormItem>
        <NFormItem label="危品等级" path="dangerLevel">
          <NInput v-model:value="formData.dangerLevel" placeholder="请输入危品等级" />
        </NFormItem>
        <NFormItem label="UN号" path="un">
          <NInput v-model:value="formData.un" placeholder="请输入UN号" />
        </NFormItem>
        <NFormItem label="化工品号" path="chemicalsNo">
          <NInput v-model:value="formData.chemicalsNo" placeholder="请输入化工品号" />
        </NFormItem>
        <NFormItem label="单价" path="price">
          <NInputNumber v-model:value="formData.price" placeholder="请输入单价" class="w-full" :precision="2" />
        </NFormItem>
        <NFormItem label="原产国" path="country">
          <NInput v-model:value="formData.country" placeholder="请输入原产国" />
        </NFormItem>
        <NFormItem label="净重" path="netWeight">
          <NInputNumber v-model:value="formData.netWeight" placeholder="请输入净重" class="w-full" :precision="4" />
        </NFormItem>
        <NFormItem label="客户确认" path="customerConfirm">
          <NInput v-model:value="formData.customerConfirm" placeholder="请输入客户确认" />
        </NFormItem>
        <NFormItem label="是否审核" path="isAudited">
          <NInput v-model:value="formData.isAudited" placeholder="请输入是否审核" />
        </NFormItem>
        <NFormItem label="商品类型" path="partType">
          <NSelect
            v-model:value="formData.partType"
            placeholder="请选择商品类型"
            :options="[{ value: '0', label: '请选择字典生成' }]"
            clearable
          />
        </NFormItem>
        <NFormItem label="待备案状态" path="partStatus">
          <NRadioGroup v-model:value="formData.partStatus">
            <NSpace>
              <NRadio value="0" label="未标记" />
              <NRadio value="1" label="已标记" />
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="更新说明" path="updateRemark">
          <NInput v-model:value="formData.updateRemark" placeholder="请输入更新说明" />
        </NFormItem>
        <NFormItem label="备注" path="remark">
          <NInput v-model:value="formData.remark" placeholder="请输入备注" />
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
