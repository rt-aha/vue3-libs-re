// --- test start (自定義錯誤測試)
export const cusVldEnglish = () => '要打英文啊~';
export const vldAsyncFn = () => '非同步測試錯誤';
// --- test end

// --- custom start
export const vldRequiredWithLabel = d => `請輸入${d.label}`;
export const vldSelectWithLabel = d => `請選擇${d.label}`;
// --- custom end

export const vldRequired = () => '此為必填選項';
export const vldSelect = () => '請選擇';
export const vldCheck = () => '請勾選';
export const vldCheckMultiple = d => `請選擇至少${d.args.min}個`;

export const vldLengthMoreThen = d => `長度需大於${d.args.min}位數`;
export const vldEnglish = () => '請輸入英文';
export const vldEmail = () => '請填寫正確格式的 Email';
export const vldAllEmail = () => '所有輸入框都必須符合 Email 格式';
export const vldOnlyOneAvatar = () => '請上傳一張照片';

export const vldNumberMoreThen = d => `請輸入大於${d.args.min}的數字`;
export const vldRadio = () => '請勾選';
export const vldCheckbox = () => '請勾選';
export const vldCheckboxGroup = d => `請選擇至少${d.args.min}個`;
export const vldBoughtCustomer = () => '請填寫以下內容';
export const vldNotBuyCustomer = () => '請填寫以下內容';
export const vldStayMins = () => '小時為0時，分不可為0';
