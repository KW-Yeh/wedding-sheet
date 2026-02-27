"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formConfig } from "@/config/formConfig";
import { FormField as FormFieldType } from "@/types/form";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

export default function FormBuilder() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id: string, value: unknown) => {
    setValues((prev) => {
      const next = { ...prev, [id]: value };
      // 清除所有依賴此欄位且條件不符的子欄位值
      formConfig.fields.forEach((f) => {
        if (
          f.conditionalOn?.fieldId === id &&
          f.conditionalOn.value !== value
        ) {
          delete next[f.id];
        }
      });
      return next;
    });
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const isFieldVisible = (field: FormFieldType) => {
    if (!field.conditionalOn) return true;
    return values[field.conditionalOn.fieldId] === field.conditionalOn.value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 前端驗證：只驗證當前可見欄位
    const newErrors: Record<string, string> = {};
    for (const field of formConfig.fields) {
      if (!isFieldVisible(field)) continue;
      if (
        field.required &&
        (values[field.id] === undefined || values[field.id] === "")
      ) {
        newErrors[field.id] = `${field.label}為必填`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Submit failed");
      router.push("/success");
    } catch {
      alert("送出失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {formConfig.fields.map((field) => {
        if (!isFieldVisible(field)) return null;
        return (
          <FormField
            key={field.id}
            field={field}
            value={values[field.id]}
            error={errors[field.id]}
            onChange={(val) => handleChange(field.id, val)}
          />
        );
      })}
      <SubmitButton isLoading={isSubmitting} />
    </form>
  );
}
