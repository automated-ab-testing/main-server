"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";

export default function SelectTest({
  testQuery,
  testData,
}: {
  testQuery: string | undefined;
  testData: {
    id: string;
    name: string;
  }[];
}) {
  // Get the search params and pathname from the URL.
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      label="Test"
      placeholder="Select a test"
      items={testData}
      selectedKeys={testQuery ? [testQuery] : []}
      onChange={(e) => {
        // Get the selected value from the event.
        const selectedValue = e.target.value;

        // Create a new search params object.
        const newSearchParams = new URLSearchParams(searchParams);

        // Update the URL with the new test ID.
        if (selectedValue) {
          newSearchParams.set("test", selectedValue);
        } else {
          newSearchParams.delete("test");
        }

        // Push the URL with the new search params.
        const rawSearchParam = newSearchParams.toString();
        router.push(
          rawSearchParam !== "" ? `${pathname}?${rawSearchParam}` : pathname,
        );
      }}
    >
      {(item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.name}
        </SelectItem>
      )}
    </Select>
  );
}
