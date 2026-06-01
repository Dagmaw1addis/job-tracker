import { getApplications } from "@/lib/actions";
import { Dashboard } from "@/components/dashboard";

export default async function Page() {
  const data = await getApplications();
  return <Dashboard initialData={data} />;
}