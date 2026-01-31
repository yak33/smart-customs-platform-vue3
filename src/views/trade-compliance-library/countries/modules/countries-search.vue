<script setup lang="ts">
import { computed, ref, toRaw } from 'vue';
import { jsonClone } from '@sa/utils';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'CountriesSearch'
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.TradeComplianceLibrary.CountriesSearchParams>('model', { required: true });

// 展开/收起状态
const expanded = ref(false);

// 用于 Select 的字符串值
const isenabledString = computed<'true' | 'false' | null>({
  get: () => {
    if (model.value.isenabled === null || model.value.isenabled === undefined) return null;
    return model.value.isenabled ? 'true' : 'false';
  },
  set: val => {
    if (val === null) {
      model.value.isenabled = null;
    } else {
      model.value.isenabled = val === 'true';
    }
  }
});

const defaultModel = jsonClone(toRaw(model.value));

const warnLevelOptions: CommonType.Option<string>[] = [
  { value: '1', label: '低' },
  { value: '2', label: '中' },
  { value: '3', label: '高' }
];

const enableOptions = [
  { value: 'true', label: '是' },
  { value: 'false', label: '否' }
];

function resetModel() {
  Object.assign(model.value, defaultModel);
}

async function reset() {
  await restoreValidation();
  resetModel();
  emit('search');
}

async function search() {
  await validate();
  emit('search');
}

function toggleExpand() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NForm :model="model" label-placement="left" :label-width="80">
      <!-- 第一行：默认显示的查询条件 -->
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" label="国家编码" label-width="auto" path="code" class="pr-24px">
          <NInput v-model:value="model.code" placeholder="请输入国家编码" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" label="国家名称" label-width="auto" path="name" class="pr-24px">
          <NInput v-model:value="model.name" placeholder="请输入国家名称" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" label="国家英文名称" label-width="auto" path="enname" class="pr-24px">
          <NInput v-model:value="model.enname" placeholder="请输入国家英文名称" />
        </NFormItemGi>
        <!-- 操作按钮放在第一行末尾 -->
        <NFormItemGi :show-feedback="false" span="24 s:12 m:6" class="pr-24px">
          <NSpace class="w-full" justify="end" align="center">
            <NButton @click="reset">
              <template #icon>
                <icon-ic-round-refresh class="text-icon" />
              </template>
              {{ $t('common.reset') }}
            </NButton>
            <NButton type="primary" ghost @click="search">
              <template #icon>
                <icon-ic-round-search class="text-icon" />
              </template>
              {{ $t('common.search') }}
            </NButton>
            <NButton text @click="toggleExpand">
              {{ expanded ? '收起' : '展开' }}
              <template #icon>
                <icon-ic-round-keyboard-arrow-up v-if="expanded" class="text-icon" />
                <icon-ic-round-keyboard-arrow-down v-else class="text-icon" />
              </template>
            </NButton>
          </NSpace>
        </NFormItemGi>
      </NGrid>

      <!-- 第二行：展开后显示的查询条件 -->
      <NGrid v-if="expanded" responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" label="自定义代码" label-width="auto" path="standardCode" class="pr-24px">
          <NInput v-model:value="model.standardCode" placeholder="请输入自定义代码" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" label="是否启用" label-width="auto" path="isenabled" class="pr-24px">
          <NSelect v-model:value="isenabledString" placeholder="请选择是否启用" :options="enableOptions" clearable />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" label="预警级别" label-width="auto" path="warnLevel" class="pr-24px">
          <NSelect v-model:value="model.warnLevel" placeholder="请选择预警级别" :options="warnLevelOptions" clearable />
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
