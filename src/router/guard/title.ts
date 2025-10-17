import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { $t } from '@/locales';

export function createDocumentTitleGuard(router: Router) {
  router.afterEach(to => {
    const { i18nKey, title } = to.meta;

    const pageTitle = i18nKey ? $t(i18nKey) : title;
    const platformTitle = $t('system.title');

    // 如果页面标题存在且不等于平台标题，则显示为"平台名称 - 页面名称"
    const documentTitle = pageTitle && pageTitle !== platformTitle ? `${platformTitle} - ${pageTitle}` : platformTitle;

    useTitle(documentTitle);
  });
}
