import { TABLE_HEADERS } from "../../../constants/defaultValues.ts";
import { TableCell } from "@mui/material";

const TableHeaders = () => {
  return (TABLE_HEADERS.map(({ text, width }) =>
    <TableCell key={text} align="center" width={width}>
      {text}
    </TableCell>));
}

export default TableHeaders;
