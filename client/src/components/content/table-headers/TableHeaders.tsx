import { TABLE_HEADERS } from "../../../constants/defaultValues.ts";
import { TableCell } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  activePeriod: string;
  setActivePeriod: Dispatch<SetStateAction<string>>;
}

const TableHeaders: React.FC<Props> = ({ activePeriod, setActivePeriod }) => {
  return TABLE_HEADERS.map(({ text, width, period }) => {
    const isActive = period === activePeriod;

    return (
      <TableCell
        key={text}
        align="center"
        width={width}
        onClick={
          period
            ? () =>
              setActivePeriod(prev => (prev === period ? '' : period))
            : undefined
        }
        sx={{
          cursor: period ? 'pointer' : 'default',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {text}
      </TableCell>
    );
  });
};

export default TableHeaders;
