import React, { useState } from "react";
import {
  Table,
  TableBody,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import TableBodyContent from "./table-body-content/TableBodyContent.tsx";
import TableHeaders from "./table-headers/TableHeaders.tsx";
import { Player } from "../../models/Player.ts";
import { Game } from "../../models/GameData.ts";
import { Filters } from "../../models/Filters.ts";

interface Props {
  games: Game[];
  filters: Filters;
  playersById?: Map<number, Player>;
}

const tableHeaderStyles = {
  [`& .${tableCellClasses.root}`]: {
    backgroundColor: 'white',
    zIndex: 100,
    borderBottom: '1px solid var(--black)',
    padding: '5px 0',
    fontSize: 'var(--font-size-normal)',
  },
};

const tableBodyStyles = {
  [`& .${tableCellClasses.root}`]: {
    borderBottom: 'none',
    padding: '0 5px',
    cursor: 'pointer',
  },
};

const Content: React.FC<Props> = ({ games, filters, playersById }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activePeriod, setActivePeriod] = useState('');

  const visibleGames = games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={games.length}
        labelRowsPerPage="Games per page"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleRowsChange}
      />

      <TableContainer sx={{ overflowX: 'unset' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={tableHeaderStyles}>
              <TableHeaders activePeriod={activePeriod} setActivePeriod={setActivePeriod} />
            </TableRow>
          </TableHead>
          <TableBody sx={tableBodyStyles}>
            {visibleGames.map((game) => (
              <TableBodyContent
                key={game.start}
                filteredGame={game}
                filters={filters}
                playersById={playersById}
                activePeriod={activePeriod}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Content;
