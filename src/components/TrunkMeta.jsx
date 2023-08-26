import { Icon } from "@mui/material";
import truckImg from "../assets/truck.png";

const TruckMeta = ({ truck }) => {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        border: `1px solid #E0E0E0`,
        borderRadius: "5px",
        minHeight: "100px",
        maxHeight: "100px",
        flex: 1,
        margin: "10px 0 10px 0",
        padding: "0 15px 0 15px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={truckImg} alt={truck.id} />
        <span style={{ color: "#E0E0E0", marginTop: "5px" }}>{truck.id}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 400 }}>From</span>
        <span style={{ fontWeight: 600 }}>{truck.from}</span>
        <span style={{ color: "#E0E0E0", marginTop: "5px" }}>
          {truck.fromAddress}
        </span>
      </div>
      <Icon sx={{ m: 2 }}>east</Icon>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontWeight: 400 }}>To</span>
        <span style={{ fontWeight: 600 }}>{truck.to}</span>
        <span style={{ color: "#E0E0E0", marginTop: "5px" }}>
          {truck.toAddress}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <span style={{ fontWeight: 400, color: "#717171" }}>Material</span>
        <span style={{ fontWeight: 600 }}>{truck.material}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <span style={{ fontWeight: 400, color: "#717171" }}>Driver</span>
        <span style={{ fontWeight: 600 }}>{truck.driver}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <span style={{ fontWeight: 400, color: "#717171" }}>Start Time</span>
        <span style={{ fontWeight: 600 }}>{truck.startedAt}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <span style={{ fontWeight: 400, color: "#717171" }}>ETA</span>
        <span style={{ fontWeight: 600 }}>{truck.eta}</span>
      </div>
    </li>
  );
};

export default TruckMeta;
