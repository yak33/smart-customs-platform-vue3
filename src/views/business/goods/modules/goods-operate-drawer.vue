<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateGoods, fetchUpdateGoods } from '@/service/api/business/goods';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'GoodsOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Business.Goods | null;
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
    add: '新增商品库',
    edit: '编辑商品库'
  };
  return titles[props.operateType];
});

type Model = Api.Business.GoodsOperateParams;

const formModel: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    ownerId: undefined,
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
    price: undefined,
    country: '',
    netWeight: undefined,
    customerConfirm: undefined,
    isAudited: undefined,
    isChecked: undefined,
    attachments: '',
    partType: '',
    partStatus: undefined,
    updateRemark: '',
    remark: '',
    createDate: undefined,
    lastUpdateBy: '',
    lastUpdateDate: undefined
  };
}

type RuleKey = Extract<keyof Model, 'partNumber'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  partNumber: createRequiredRule('件号(物料号)不能为空')
};

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(formModel, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(formModel, props.rowData);
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
  } = formModel;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateGoods({
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
    const { error } = await fetchUpdateGoods({
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
      <NForm ref="formRef" :model="formModel" :rules="rules">
        <NFormItem label="所属企业" path="ownerId">
          <NInput v-model:value="formModel.ownerId" placeholder="请输入所属企业ID" />
        </NFormItem>
        <NFormItem label="件号(物料号)" path="partNumber">
          <NInput v-model:value="formModel.partNumber" placeholder="请输入件号(物料号)" />
        </NFormItem>
        <NFormItem label="供应商" path="customerNo">
          <NInput v-model:value="formModel.customerNo" placeholder="请输入供应商" />
        </NFormItem>
        <NFormItem label="附加码" path="additionalCode">
          <NInput v-model:value="formModel.additionalCode" placeholder="请输入附加码" />
        </NFormItem>
        <NFormItem label="申报品名" path="hsname">
          <NInput v-model:value="formModel.hsname" placeholder="请输入申报品名" />
        </NFormItem>
        <NFormItem label="税号" path="hscode">
          <NInput v-model:value="formModel.hscode" placeholder="请输入税号" />
        </NFormItem>
        <NFormItem label="申报要素" path="hsmodel">
          <NInput v-model:value="formModel.hsmodel" placeholder="请输入申报要素" />
        </NFormItem>
        <NFormItem label="疫检代码" path="ciqCode">
          <NInput v-model:value="formModel.ciqCode" placeholder="请输入疫检代码" />
        </NFormItem>
        <NFormItem label="疫检名称" path="ciqName">
          <NInput v-model:value="formModel.ciqName" placeholder="请输入疫检名称" />
        </NFormItem>
        <NFormItem label="申报要素备注" path="hsmemo">
          <NInput v-model:value="formModel.hsmemo" :rows="3" type="textarea" placeholder="请输入申报要素备注" />
        </NFormItem>
        <NFormItem label="型号规格" path="model">
          <NInput v-model:value="formModel.model" placeholder="请输入型号规格" />
        </NFormItem>
        <NFormItem label="中文品名" path="name">
          <NInput v-model:value="formModel.name" placeholder="请输入中文品名" />
        </NFormItem>
        <NFormItem label="英文品名" path="enName">
          <NInput v-model:value="formModel.enName" placeholder="请输入英文品名" />
        </NFormItem>
        <NFormItem label="英文描述" path="enMemo">
          <NInput v-model:value="formModel.enMemo" placeholder="请输入英文描述" />
        </NFormItem>
        <NFormItem label="中文描述" path="cnMemo">
          <NInput v-model:value="formModel.cnMemo" placeholder="请输入中文描述" />
        </NFormItem>
        <NFormItem label="单位" path="unit">
          <NInput v-model:value="formModel.unit" placeholder="请输入单位" />
        </NFormItem>
        <NFormItem label="包装" path="pack">
          <NInput v-model:value="formModel.pack" placeholder="请输入包装" />
        </NFormItem>
        <NFormItem label="是否危品" path="danger">
          <NInput v-model:value="formModel.danger" placeholder="请输入是否危品" />
        </NFormItem>
        <NFormItem label="危品等级" path="dangerLevel">
          <NInput v-model:value="formModel.dangerLevel" placeholder="请输入危品等级" />
        </NFormItem>
        <NFormItem label="UN号" path="un">
          <NInput v-model:value="formModel.un" placeholder="请输入UN号" />
        </NFormItem>
        <NFormItem label="化工品号" path="chemicalsNo">
          <NInput v-model:value="formModel.chemicalsNo" placeholder="请输入化工品号" />
        </NFormItem>
        <NFormItem label="原产国" path="country">
          <NInput v-model:value="formModel.country" placeholder="请输入原产国" />
        </NFormItem>
        <NFormItem label="商品类型（1原材料、2辅料、3成品、4半成品、5商品）" path="partType">
          <NInput
            v-model:value="formModel.partType"
            placeholder="请输入商品类型（1原材料、2辅料、3成品、4半成品、5商品）"
          />
        </NFormItem>
        <NFormItem label="更新说明" path="updateRemark">
          <NInput v-model:value="formModel.updateRemark" placeholder="请输入更新说明" />
        </NFormItem>
        <NFormItem label="备注" path="remark">
          <NInput v-model:value="formModel.remark" placeholder="请输入备注" />
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
