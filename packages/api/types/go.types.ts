export type GoApiCorridor = {
  corridorId: number;
  code: string;
  name: string;
  trips: Array<{
    number: string;
    name: string;
    patternCode: string;
  }>;
  routes: Array<{
    stops: Array<{
      locationId: number;
      code: string;
      name: string;
      abbreviation: string;
      atlsId: number;
      metadata: any;
      locationTypeId: number;
      locationTypeCode: string;
      latitude: number;
      longitude: number;
      timingPoint: string;
      isAdded: boolean;
      isCancelled: boolean;
      hasBus: boolean;
      stopOrder: number;
    }>;
    patternCode: string;
  }>;
  stops: Array<{
    locationId: number;
    code: string;
    name: string;
    abbreviation: string;
    atlsId: number;
    metadata: any;
    locationTypeId: number;
    locationTypeCode: string;
    latitude: number;
    longitude: number;
    timingPoint: string;
    isAdded: boolean;
    isCancelled: boolean;
    hasBus: boolean;
    stopOrder: number;
  }>;
  isBus: boolean;
};

export interface GoLine {
  name: string;
  code: string;
  id: number;
  isBookmarked: boolean;
}

export interface GoLineDetails extends GoLine {
  stops: GoStop[];
  trips: GoTrip[];
}

export interface GoStop {
  locationId: number;
  code: string;
  name: string;
  abbreviation: string;
  atlsId: number;
  metadata: any;
  locationTypeId: number;
  locationTypeCode: string;
  latitude: number;
  longitude: number;
  timingPoint: string;
  isAdded: boolean;
  isCancelled: boolean;
  hasBus: boolean;
  stopOrder: number;
}

export interface GoStopDetails extends GoStop {
  trips: GoTrip[];
}

export interface GoTrip {
  number: string;
  name: string;
  patternCode: string;
}

export interface GoTripDetails {
  updatedAt: string;
  tripNumber: string;
  tripName: string;
  corridor: any;
  updateTime: string;
  stop: Array<{
    order: number;
    id: number;
    schArrival: string;
    revisedArrival: any;
    schDeparture?: string;
    completeInfo: {
      actArrival?: string;
      actDeparture?: string;
      delaySecond: number;
      delayStatus: string;
      updateTime: string;
      actTrack: string;
    };
    name: string;
    engineId: string;
    isStopping: string;
    isCancelled: string;
    isOverride: string;
    schTrack: string;
    actualTime: string;
  }>;
  consistDetails: Array<any>;
}

export type GoApiTrip = {
  date: string;
  commitmentTrip: Array<{
    tripNumber: string;
    tripName: string;
    corridor: any;
    updateTime: string;
    stop: Array<{
      order: number;
      id: number;
      schArrival: string;
      revisedArrival: any;
      schDeparture?: string;
      completeInfo?: {
        actArrival?: string;
        actDeparture: string;
        delaySecond: number;
        delayStatus: string;
        updateTime: string;
        actTrack: string;
      };
      name: string;
      engineId: string;
      isStopping: string;
      isCancelled: string;
      isOverride: string;
      schTrack?: string;
      actualTime: string;
    }>;
    consistDetails: Array<any>;
  }>;
  errCode: number;
  errMsg: string;
};
