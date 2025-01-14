// "use client";

// import { Button } from "@nextui-org/react";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type OrdersData = {
//   ID: string;
//   Test: { id: string; label: string };
//   SubTest: { id: string; label: string }[];
//   Price: number;
// };

// export const columns: ColumnDef<OrdersData>[] = [
//   {
//     accessorKey: "ID",
//     header: "ID",
//   },
//   {
//     accessorKey: "Test",
//     header: "Test ID",
//     cell: ({ row }) => row.original.Test.label,
//   },
//   {
//     accessorKey: "SubTest",
//     header: "SubTest IDs",
//     cell: ({ row }) =>
//       row.original.SubTest
//         ? row.original.SubTest.map((subTest) => subTest.label).join(", ")
//         : "",
//   },
//   {
//     accessorKey: "Price",
//     header: "Price",
//   },
//   {
//     accessorKey: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <Button
//         color="danger"
//         size="sm"
//         onClick={() => handleDelete(row.original.ID)} // Define a function to handle delete action
//       >
//         <Trash2 /> {/* Render the Trash icon */}
//       </Button>
//     ),
//   },
// ];
