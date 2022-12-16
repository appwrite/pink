import Heading1 from "../components/Heading1.astro";
import Heading2 from "../components/Heading2.astro";
import Heading3 from "../components/Heading3.astro";
import Table from "../components/Table.astro";
import TableBody from "../components/TableBody.astro";
import TableHead from "../components/TableHead.astro";
import TableCol from "../components/TableCol.astro";
import TableHeadCol from "../components/TableHeadCol.astro";
import TableRow from "../components/TableRow.astro";
import Image from "../components/Image.astro";

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
};
