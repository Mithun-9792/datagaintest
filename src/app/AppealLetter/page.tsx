import AppealTable from "@/components/AppealTable";
import PageHeader from "@/components/PageHeader";
import React from "react";

function AppealLetter() {
  return (
    <div>
      <PageHeader title="Appeal Letter" count={5} />
      <AppealTable />
    </div>
  );
}

export default AppealLetter;
