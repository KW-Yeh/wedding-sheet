import FormBuilder from "@/components/Form/FormBuilder";
import { formConfig } from "@/config/formConfig";

export default function HomePage() {
  return (
    <main>
      {/* <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-wedding-hero">
      </section>

      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-wedding-bg">
      </section>

      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-wedding-bg">
      </section>

      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-wedding-bg">
      </section>

      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-wedding-bg">
      </section> */}

      {/* Section 6 – 出席確認表單 */}
      <section className="min-h-screen px-4 py-20 bg-wedding-bg">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">
              {formConfig.title}
            </h1>
            {formConfig.description && (
              <p className="text-lg text-gray-500">{formConfig.description}</p>
            )}
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <FormBuilder />
          </div>
        </div>
      </section>
    </main>
  );
}
