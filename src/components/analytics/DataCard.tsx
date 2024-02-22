import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import getTestNames from "~/utils/admin/get-test-names";
import getAnalytics from "~/utils/admin/get-analytics";
import SelectTest from "~/components/analytics/SelectTest";
import BarChart from "~/components/analytics/BarChart";

export default async function DataCard({ test }: { test: string | undefined }) {
  return (
    <Card className="h-1/2 min-h-96 w-1/2 min-w-96">
      <CardHeader>
        <p className="text-lg">A/B Testing Analytics</p>
      </CardHeader>
      <Divider />
      {/* NOTE: Data tidak boleh kosong untuk dijalankan pada Chart */}
      <CardBody className="items-center justify-center">
        {test ? (
          <BarChart analyticsData={await getAnalytics({ testId: test })} />
        ) : (
          <p className="text-lg">Please select a test!</p>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <SelectTest testQuery={test} testData={await getTestNames()} />
      </CardFooter>
    </Card>
  );
}
