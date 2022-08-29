// --- test start 要打英文啊~~ (自定義錯誤測試)
export const cusVldEnglish = () => `要打英文啊~`;
export const vldAsyncFn = () => `非同步測試錯誤`;
// --- test end

// --- custom start
export const vldRequiredWithLabel = (d) => `請輸入${d.label}`;
export const vldSelectWithLabel = (d) => `請選擇${d.label}`;
// --- custom end

export const vldRequired = () => '此為必填選項';
export const vldSelect = (d) => `請選擇${d.label}`;

export const vldLengthMoreThen = (d) => `長度需大於${d.args.min}位數`;
export const vldEnglish = () => `請輸入英文`;
export const vldEmail = () => '請填寫正確格式的 Email';
export const vldAllEmail = () => '所有輸入框都必須符合 Email 格式';
export const vldOnlyOneAvatar = () => '請上傳一張照片';
