import { FormConfig } from "@/types/form";

export const formConfig: FormConfig = {
  title: "婚禮出席確認",
  description: "請填寫以下資料，讓我們為您做好準備 🎊",
  sheetName: "default",
  successMessage: "感謝您的回覆！期待與您共同慶祝這份喜悅 🥂",
  fields: [
    {
      id: "name",
      label: "姓名",
      type: "text",
      placeholder: "請輸入您的姓名",
      required: true,
      validation: { minLength: 2, maxLength: 50 },
    },
    {
      id: "relation",
      label: "關係",
      type: "radio",
      required: true,
      options: [
        { label: "男方親戚", value: "groom_family" },
        { label: "女方親戚", value: "bride_family" },
        { label: "男方朋友／同事", value: "groom_friend" },
        { label: "女方朋友／同事", value: "bride_friend" },
      ],
    },
    {
      id: "hasPlusOne",
      label: "是否攜伴",
      type: "radio",
      required: true,
      options: [
        { label: "是", value: "yes" },
        { label: "否", value: "no" },
      ],
    },
    {
      id: "plusOneCount",
      label: "出席人數（含本人）",
      type: "number",
      placeholder: "請輸入總出席人數（含您自己）",
      helperText: "人數請包含您自己，例如您 + 1 位同伴請填 2",
      required: true,
      conditionalOn: {
        fieldId: "hasPlusOne",
        value: "yes",
      },
      validation: { min: 2, max: 10 },
    },
    {
      id: "transportation",
      label: "交通方式",
      type: "radio",
      required: true,
      options: [
        { label: "高鐵需接駁", value: "hsr_shuttle" },
        { label: "自行前往", value: "self" },
      ],
    },
    {
      id: "mealType",
      label: "飲食偏好",
      type: "radio",
      required: true,
      options: [
        { label: "葷食", value: "meat" },
        { label: "素食", value: "vegetarian" },
      ],
    },
    {
      id: "needsHighchair",
      label: "是否需要小孩座椅",
      type: "radio",
      required: true,
      options: [
        { label: "是", value: "yes" },
        { label: "否", value: "no" },
      ],
    },
    {
      id: "highchairCount",
      label: "需要座椅數量",
      type: "number",
      placeholder: "請輸入所需座椅數量",
      required: true,
      conditionalOn: {
        fieldId: "needsHighchair",
        value: "yes",
      },
      validation: { min: 1, max: 10 },
    },
    {
      id: "message",
      label: "給予祝福 / 備註",
      type: "textarea",
      placeholder: "留下您對新人的祝福，或是其他想告知我們的事...",
      required: false,
      rows: 4,
    },
  ],
};
