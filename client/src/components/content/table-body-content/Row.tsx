import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import React, { ReactElement } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface TableRowValues {
  date: string;
  teams: ReactElement;
  period1: ReactElement,
  period2: ReactElement,
  period3: ReactElement,
  OT: ReactElement,
  SO: ReactElement,
  result: ReactElement,
  expandedContent: ReactElement
}

interface Props {
  game: TableRowValues;
  selected: boolean;
  onClick: () => void;
  setHoveredRow: (date: string, value: boolean) => void;
}

const Row: React.FC<Props> = ({ game, onClick, selected, setHoveredRow }) => {
  const tableRowStyles = {
    '&:hover': {
      backgroundColor: 'var(--light-grey)'
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'var(--light-grey)'
    },
    '&.Mui-selected': {
      backgroundColor: 'var(--light-grey)'
    },
  };

  return (
    <React.Fragment key={game.date}>
      <TableRow
        selected={selected}
        onClick={onClick}
        sx={tableRowStyles}
        onMouseLeave={() => setHoveredRow(game.date, false)}
        onMouseEnter={() => setHoveredRow(game.date, true)}
      >
        <TableCell align="center" width="60px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.date}</TableCell>
        <TableCell align="center" width="81px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.teams}</TableCell>
        <TableCell align="center" width="223px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.period1}</TableCell>
        <TableCell align="center" width="223px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.period2}</TableCell>
        <TableCell align="center" width="223px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.period3}</TableCell>
        <TableCell align="center" width="58px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.OT}</TableCell>
        <TableCell align="center" width="25px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.SO}</TableCell>
        <TableCell align="center" width="62px" sx={{ fontSize: 'var(--font-size-normal)' }}>{game.result}</TableCell>

        {/*This is the last column expand button*/}
        <TableCell align="center" width="30px">
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ borderRadius: '0', border: '1px solid var(--black)', padding: 0 }}
          >
            {selected ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={selected} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {game.expandedContent}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default Row;
