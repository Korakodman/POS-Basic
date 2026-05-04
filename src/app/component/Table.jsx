"use client";

import { Pagination, Table } from "@heroui/react";
import { useMemo, useState } from "react";

const ROWS_PER_PAGE = 5;

export default function TableUI({ item }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(item.length / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return item.slice(start, start + ROWS_PER_PAGE);
  }, [page, item]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, item.length);

  return (
    <Table className="w-full ">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[400px] p-2">

          {/* HEADER */}
          <Table.Header className="" >
            <Table.Column isRowHeader className="py-3 text-xl text-black">รหัสใบเสร็จ</Table.Column>
            <Table.Column className="py-3 text-xl text-black">จำนวนเงิน</Table.Column>
            <Table.Column className="py-3 text-xl text-black">สถานะ</Table.Column>
            <Table.Column className="py-3 text-xl text-black">วันที่</Table.Column>
            <Table.Column className="py-3 text-xl text-black">รายละเอียด</Table.Column>
          </Table.Header>

          {/* BODY */}  
          <Table.Body >
             {paginatedItems.map((i) => (
    <Table.Row key={i._id}>
      <Table.Cell>{i._id}</Table.Cell>
      <Table.Cell>{i.total} บาท</Table.Cell>
      <Table.Cell>{i.status}</Table.Cell>
      <Table.Cell>
        {new Date(i.createdAt).toLocaleDateString("th-TH")}
      </Table.Cell>
      <Table.Cell>กดเพื่อดูรายละเอียด</Table.Cell>
    </Table.Row>
  ))}
          </Table.Body>

        </Table.Content>
      </Table.ScrollContainer>

      {/* FOOTER PAGINATION */}
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} - {end} จาก {item.length} รายการ
          </Pagination.Summary>

          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Pagination.Previous>
            </Pagination.Item>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}

            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}