import { Box } from "@mui/material";
import TicketGerente from "./TicketGerente";
import Ticket from "../types/Ticket";

interface ColumnaTicketsProps {
  tickets: Ticket[];
}

const ColumnaTickets: React.FC<ColumnaTicketsProps> = ({ tickets }) => {
  return (
    <>
      <Box
        sx={{
          padding: 2,
          height: "90%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tickets.map((ticket) => (
          <TicketGerente ticket={ticket}></TicketGerente>
        ))}
      </Box>
    </>
  );
};

export default ColumnaTickets;
