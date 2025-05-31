"use client";
import AppealedForm from "@/components/AppealedForm";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  return (
    <div className="px-4">
      <div className="mb-8">
        <PageHeader title="Home" />
      </div>
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Appeal Letter
        </h2>

        <AppealedForm />
      </div>
    </div>
  );
}
