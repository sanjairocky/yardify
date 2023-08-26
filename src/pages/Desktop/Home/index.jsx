import { Autocomplete, Button, Icon, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import TruckMeta from "../../../components/TrunkMeta";

const materials = ["meat", "fish", "vegetables", "fruits", "dairy"];
const carriers = ["ABC", "BCD", "CDE", "DEF", "EFG"];
const tabs = [
  "Expected-Arrivals",
  "Checked-In",
  "Parking-area",
  "Loading",
  "Un-loading",
  "Checked-Out",
];

const status = ["loading", "un-loading", "in-transit", "parking"];

const getFutureDate = (days) => {
  return new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
};

//some eta in past and some in future
const getEndedAt = (eta) => {
  const date = new Date(eta);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `2021-10-10 10:${hours % 2 === 0 ? 15 - minutes : 15 + minutes}:00`;
};

const yards = [
  { name: "ABSJ Center", address: "BENTONVILE" },
  { name: "XYZH Center", address: "BENTONVILE" },
];

const trucks = [...Array(50).keys()].map((item) => {
  const from = yards[Math.floor(Math.random() * yards.length)];
  const to = yards.filter((a) => a.name !== from)[
    Math.floor(Math.random() * yards.length)
  ];
  const d = getFutureDate(item);
  const eta = d.toISOString();
  d.setHours(d.getHours() - Math.floor(Math.random() * item));
  return {
    id: "P8650897" + item,
    from: from.name,
    fromAddress: from.address,
    to: to.name,
    toAddress: to.address,
    carrier: carriers[Math.floor(Math.random() * carriers.length)],
    driver: "John Doe",
    startedAt: d.toISOString(),
    eta: eta,
    endedAt: getEndedAt(eta),
    status: status[Math.floor(Math.random() * status.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
  };
});

const truckFilter =
  ({ state, yard, carrier = [], material = [] }) =>
  (truck) => {
    let flag = true;
    switch (state) {
      case "Expected-Arrivals":
        flag =
          flag &&
          truck.status === "in-transit" &&
          new Date() < new Date(truck.eta) &&
          truck.to === yard.name;
        break;
      case "Checked-In":
        flag =
          flag &&
          (truck.status === "parking" || truck.status === "un-loading") &&
          truck.from === yard.name;
        break;
      case "Parking-area":
        flag = flag && truck.status === "parking";
        break;
      case "Loading":
        flag = flag && truck.status === "loading" && truck.from === yard.name;
        break;
      case "Un-loading":
        flag = flag && truck.status === "un-loading" && truck.to === yard.name;
        break;
      case "Checked-Out":
        flag = flag && truck.status === "in-transit" && truck.from === yard;
        break;
      default:
        flag = flag && true;
    }
    if (carrier.length > 0) flag = flag && carrier.includes(truck.carrier);
    if (material.length > 0) flag = flag && material.includes(truck.material);
    return flag;
  };

const Home = () => {
  const theme = useTheme();
  const [state, setState] = useState("Expected-Arrivals");
  const [carrier, setCarrier] = useState([]);
  const [material, setMaterial] = useState([]);
  const [yard] = useState(yards[Math.floor(Math.random() * yards.length)]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(7);
  const [filteredTrucks, setFilteredTrucks] = useState(trucks);

  useEffect(() => {
    setFilteredTrucks(
      trucks.filter(truckFilter({ state, yard, carrier, material }))
    );
  }, [state, yard, carrier, material, page, rowsPerPage]);

  const paginatedTrucks = filteredTrucks.slice(page * rowsPerPage, rowsPerPage);

  return (
    <>
      <div style={{ display: "flex", margin: "20px 0", flex: 0.1 }}>
        <div
          style={{
            display: "flex",
            flex: 0.7,
            justifyContent: "space-between",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {tabs.map((item, index) => (
            <Button
              sx={{
                borderBottom:
                  state === item
                    ? `2px solid ${theme.palette.secondary.main}`
                    : "none",
                color: theme.palette.text.primary,
                textTransform: "none",
              }}
              key={`${item}${index}`}
              onClick={() => {
                setState(item);
                setPage(0);
              }}
            >
              <span
                style={{
                  fontWeight: state === item ? 800 : 500,
                }}
              >
                {item}
              </span>
            </Button>
          ))}
        </div>
        <div
          style={{ display: "flex", flex: "0.4", justifyContent: "flex-end" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Icon>map</Icon>}
            >
              Yard Layout
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "20px" }}
              startIcon={<Icon>add</Icon>}
            >
              ADHOC Service
            </Button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 0.1 }}>
        <Autocomplete
          multiple
          disablePortal
          onChange={(_, value) => setMaterial(value)}
          options={[
            ...new Set(
              trucks
                .filter(truckFilter({ state, yard }))
                .map((truck) => truck.material)
            ),
          ]}
          filterSelectedOptions
          defaultValue={material}
          sx={{ width: 300, marginRight: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Type of Material" />
          )}
        />
        <Autocomplete
          filterSelectedOptions
          multiple
          disablePortal
          onChange={(_, value) => setCarrier(value)}
          defaultValue={carrier}
          options={[
            ...new Set(
              trucks
                .filter(truckFilter({ state, yard }))
                .map((truck) => truck.carrier)
            ),
          ]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Carrier" />}
        />
      </div>
      <ul
        style={{
          flex: 0.7,
          display: "flex",
          overflowY: "scroll",
          flexDirection: "column",
        }}
      >
        {paginatedTrucks.map((truck) => (
          <TruckMeta key={truck.id} truck={truck} />
        ))}
      </ul>
      <div style={{ display: "flex", flex: 0.1, alignItems: "center" }}>
        <div>{`Showing data ${Math.min(
          page * rowsPerPage + 1,
          paginatedTrucks.length
        )} to ${Math.min(rowsPerPage, paginatedTrucks.length)} of  ${
          filteredTrucks.length
        } entries`}</div>
      </div>
    </>
  );
};

export default Home;
