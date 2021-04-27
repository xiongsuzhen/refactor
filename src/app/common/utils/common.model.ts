export interface ResData {
  code: number;
  data?: [] | {};
  msg: string;
}

export interface SLIDESHOW {
  slide: number;
  pandect: {
    energy:true;
    electricity: boolean;
    oxygen: boolean;
    gas_mixture: boolean;
    water: boolean;
  };
  monitor: {
    electricity: boolean;
    oxygen: boolean;
    gas_mixture: boolean;
    water: boolean;
  };
}
