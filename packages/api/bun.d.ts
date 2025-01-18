declare module "bun" {
  interface Env {
    PORT: string;
    GO_TRANSIT_CORRIDORS_API: string;
    GO_TRANSIT_STATION_API: string;
    VIA_RAIL_STATIONS_API: string;
    VIA_RAIL_TRAINS_API: string;
  }
}
