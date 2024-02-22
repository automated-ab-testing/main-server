import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import getInitialData from "~/utils/user/get-initial-data";

export default async function DisplayVersion() {
  // Get the initial data (cached on the server)
  const { versionId } = await getInitialData();

  return (
    <Card>
      <CardHeader>
        <p className="text-md">Version ID</p>
      </CardHeader>
      <Divider />
      <CardBody>
        {versionId ? <p>{versionId}</p> : <p>There is no active test!</p>}
      </CardBody>
    </Card>
  );
}
