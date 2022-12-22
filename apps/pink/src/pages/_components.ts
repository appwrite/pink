import Heading1 from "@components/defaults/Heading1.astro";
import Heading2 from "@components/defaults/Heading2.astro";
import Heading3 from "@components/defaults/Heading3.astro";
import Table from "@components/defaults/Table.astro";
import TableBody from "@components/defaults/TableBody.astro";
import TableHead from "@components/defaults/TableHead.astro";
import TableCol from "@components/defaults/TableCol.astro";
import TableHeadCol from "@components/defaults/TableHeadCol.astro";
import TableRow from "@components/defaults/TableRow.astro";
import Image from "@components/defaults/Image.astro";
import Code from "@components/defaults/Code.astro";
import Paragraph from "@components/defaults/Paragraph.astro";
import Strong from "@components/defaults/Strong.astro";
import Link from "@components/defaults/Link.astro";

export const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  table: Table,
  tbody: TableBody,
  thead: TableHead,
  th: TableHeadCol,
  td: TableCol,
  tr: TableRow,
  img: Image,
  code: Code,
  p: Paragraph,
  strong: Strong,
  a: Link,
};
