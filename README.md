### common
- [x] Button
- [x] Divider
- [x] Dropdown
  - [ ] 多層級
  - [ ] hover 展開

### dataDisplay
- [x] Accordion
- [x] Avatar
  - [ ] 應改為背景圖
- [x] Badge
  - [ ] 新增一個可以插入文字或圖的功能
- [x] Empty
- [x] Image
- [x] Tags/DynamicTags
  - [ ] extra 編輯功能
- [x] Paragraph
- [-] List
- [-] Table
- [x] SimpleTable
- [x] Countdown
- [-] TimeLine
  - 先做了個基本的
  - [ ] 要能放 render comp 進去
- [x] Tree
  - [ ] 可點擊
  - [ ] 可禁用
  - [ ] render
- [-] CountTo 
  - 只是多包一層 countup，多了一個接近顯示才開始轉動的判斷，但可再優化
- [-] swiper
  - 先輕封裝一層，config 那些還沒寫進去
### dataInput
- [x] Form//
  - [x] 把非同步驗證加進去，完成後刪除 async-validator 套件
- [x] FormGrid
- [x] FormItem
- [x] FormMessage
- [x] Radio
- [x] Switch
- [x] Textarea
- [x] TimePicker
  - [ ] timelist 不用抽成組件
  - [ ] 處理 console.log 跳的錯誤
  - [ ] 顯示 UI 應該和時間同步
- [x] DatePicker
- [x] DateRangePicker
- [x] Checkbox
- [x] InputList/DynamicInputs
  - [ ] 待 emailAutoComplete 完成，做一版輸入 email 的
  - [ ] 可動態插不同組件
- [x] Input
  - [ ] 功能 - 字數限制
- [x] InputNumber
  - [ ] 小數點還要處理
  - [ ] 使用千分位
- [x] Upload
  - [x] 各種附帶屬性
  - [x] 預覽方式要有條列式和方塊形式
  - [x] 影片預覽圖，中間要有一個播放鍵
  - [x] 影片點擊要可以播放
- [x] Transfer
- [x] Select
  - [ ] 可清除功能
  - [x] MultiSelect
  - [ ] SearchSelect
  - [ ] GroupSelect
  - [ ] 整體禁用
- [-] DependencySelect
  - [ ] 寫進Select 不需要額外一個組件
- [x] EmailAutoComplete
- [x] Slider
- [x] AutoInput
- [x] Markdown Editor
  - 封裝 @kangc/v-md-editor
### feedback
- [x] Modal
- [x] Drawer
- [x] Skeleton
  - [ ] 做些卡片或文章之類的例子
- [x] Loading
  - [ ] 只做一個圈圈而已
- [x] Tooltip(PopOver)
- [-] Message
  - 先做一版基本的
  - [ ] 待優化：目前用 watch 判斷新推入字串，若有一樣字串，會失效
  - [ ] 可用 render
- [ ] Notification
- [x] Steps
  - [ ] 有空補個直的
### navigation
- [x] Breadcrumb
- [-] Tabs
  - [ ] 先只做最基本的
- [x] Pagination


### 其他
- [ ] common 說明
- [ ] dataDisplay 說明
- [ ] navigation 說明
- [ ] feedback 說明
- [ ] 