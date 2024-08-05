import { Box, Typography } from "@mui/material";
import Ticket from "../types/Ticket";
import { useEffect, useState } from "react";
import Prioridad from "../types/enums/Prioridad";

interface TicketGerenteProps {
  ticket: Ticket | null;
}

const TicketGerente: React.FC<TicketGerenteProps> = ({ ticket }) => {
  const [colorPrior, setColorPrior] = useState<string>("");
  const [tiempoDesde, setTiempoDesde] = useState<string>("");

  function calculateTimeElapsed() {
    let startDate: Date = new Date();
    if (ticket) {
      startDate = new Date(ticket.fechaCreacion);
    }

    const currentDate: Date = new Date();

    const millisecondsInADay: number = 24 * 60 * 60 * 1000;
    const millisecondsInAnHour: number = 60 * 60 * 1000;
    const millisecondsInAMinute: number = 60 * 1000;

    const differenceInMilliseconds: number =
      currentDate.getTime() - startDate.getTime();

    if (differenceInMilliseconds >= millisecondsInADay) {
      const daysElapsed: number = Math.floor(
        differenceInMilliseconds / millisecondsInADay
      );
      setTiempoDesde(`Hace ${daysElapsed} días`);
    } else if (differenceInMilliseconds >= millisecondsInAnHour) {
      const hoursElapsed: number = Math.floor(
        differenceInMilliseconds / millisecondsInAnHour
      );
      setTiempoDesde(`Hace ${hoursElapsed} horas`);
    } else {
      const minutesElapsed: number = Math.floor(
        differenceInMilliseconds / millisecondsInAMinute
      );
      setTiempoDesde(`Hace ${minutesElapsed} minutos`);
    }
  }

  useEffect(() => {
    calculateTimeElapsed();
  });

  useEffect(() => {
    const priorityColor = () => {
      if (ticket?.prioridad === Prioridad.BAJA) {
        setColorPrior("#3cc2b7");
      } else if (ticket?.prioridad === Prioridad.MEDIA) {
        setColorPrior("#ccbd4b");
      } else {
        setColorPrior("#eb4242");
      }
    };

    priorityColor();
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 110,
        bgcolor: "#eee",
        border: "1px solid #aaa",
        padding: 1,
        mb: 2,
      }}
    >
      <Typography variant="subtitle1" color={"#2e40a3"}>
        <b>{ticket?.titulo}</b>
      </Typography>
      <Typography variant="subtitle1" color={"#555"}>
        {tiempoDesde}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            height: 10,
            width: 10,
            borderRadius: "50%",
            mr: 1,
          }}
          bgcolor={colorPrior}
        ></Box>
        <Typography variant="subtitle1" color={"#555"}>
          <b>{ticket?.prioridad}</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default TicketGerente;
