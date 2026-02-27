export type UnitDef = {
  id: string;
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
};

export type CategoryDef = {
  id: string;
  label: string;
  units: UnitDef[];
};

const mult = (id: string, label: string, multiplier: number): UnitDef => ({
  id,
  label,
  toBase: (v) => v * multiplier,
  fromBase: (v) => v / multiplier,
});

export const categories: CategoryDef[] = [
  {
    id: "pressure",
    label: "Pressure",
    units: [
      mult("pa", "Pa", 1),
      mult("kpa", "kPa", 1000),
      mult("mpa", "MPa", 1000000),
      mult("bar", "bar", 100000),
      mult("mbar", "mbar", 100),
      mult("atm", "atm", 101325),
      mult("psi", "psi", 6894.757293168),
      mult("psia", "psia", 6894.757293168),
      {
        id: "psig",
        label: "psig",
        toBase: (v) => (v + 14.6959488) * 6894.757293168,
        fromBase: (v) => v / 6894.757293168 - 14.6959488,
      },
      mult("mmhg", "mmHg", 133.322387415),
      mult("torr", "torr", 133.322368421),
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    units: [
      {
        id: "c",
        label: "Celsius (°C)",
        toBase: (v) => v + 273.15,
        fromBase: (v) => v - 273.15,
      },
      {
        id: "f",
        label: "Fahrenheit (°F)",
        toBase: (v) => (v - 32) * (5 / 9) + 273.15,
        fromBase: (v) => (v - 273.15) * (9 / 5) + 32,
      },
      { id: "k", label: "Kelvin (K)", toBase: (v) => v, fromBase: (v) => v },
      {
        id: "r",
        label: "Rankine (°R)",
        toBase: (v) => v * (5 / 9),
        fromBase: (v) => v * (9 / 5),
      },
    ],
  },
  {
    id: "mass_flow",
    label: "Mass Flow",
    units: [
      mult("kgs", "kg/s", 1),
      mult("kgh", "kg/h", 1 / 3600),
      mult("tonh", "ton/h", 1000 / 3600),
      mult("lbs", "lb/s", 0.45359237),
      mult("lbh", "lb/h", 0.45359237 / 3600),
    ],
  },
  {
    id: "vol_flow",
    label: "Volumetric Flow",
    units: [
      mult("m3s", "m³/s", 1),
      mult("m3h", "m³/h", 1 / 3600),
      mult("ls", "L/s", 0.001),
      mult("lmin", "L/min", 0.001 / 60),
      mult("ft3s", "ft³/s", 0.028316846592),
      mult("cfm", "ft³/min (CFM)", 0.028316846592 / 60),
      mult("gpm", "gal/min (US)", 0.003785411784 / 60),
      mult("bpd", "bbl/day", 0.158987294928 / 86400),
    ],
  },
  {
    id: "gas_flow",
    label: "Gas Flow",
    units: [
      mult("nm3h", "Nm³/h (0°C, 1atm)", 1),
      mult("sm3h", "Sm³/h (15°C, 1atm)", 1.05491488),
      mult("scfm", "SCFM (60°F, 1atm)", 1.60748),
      mult("mmscfd", "MMSCFD", 1116.3),
    ],
  },
  {
    id: "mass",
    label: "Mass",
    units: [
      mult("kg", "kg", 1),
      mult("g", "g", 0.001),
      mult("mg", "mg", 1e-6),
      mult("ton", "metric ton (t)", 1000),
      mult("lb", "lb", 0.45359237),
      mult("oz", "oz", 0.45359237 / 16),
    ],
  },
  {
    id: "energy",
    label: "Energy",
    units: [
      mult("j", "J", 1),
      mult("kj", "kJ", 1000),
      mult("mj", "MJ", 1e6),
      mult("gj", "GJ", 1e9),
      mult("cal", "cal", 4.184),
      mult("kcal", "kcal", 4184),
      mult("btu", "BTU", 1055.05585),
      mult("mmbtu", "MMBTU", 1055.05585 * 1e6),
      mult("kwh", "kWh", 3.6e6),
      mult("mwh", "MWh", 3.6e9),
    ],
  },
  {
    id: "power",
    label: "Power",
    units: [
      mult("w", "W", 1),
      mult("kw", "kW", 1000),
      mult("mw", "MW", 1e6),
      mult("hp_mech", "HP (Mechanical)", 745.699872),
      mult("hp_metric", "HP (Metric)", 735.49875),
      mult("btu_hr", "BTU/hr", 0.293071),
      mult("kcal_h", "kcal/h", 1.16222),
    ],
  },
  {
    id: "length",
    label: "Length",
    units: [
      mult("m", "m", 1),
      mult("cm", "cm", 0.01),
      mult("mm", "mm", 0.001),
      mult("km", "km", 1000),
      mult("in", "in", 0.0254),
      mult("ft", "ft", 0.3048),
      mult("yd", "yd", 0.9144),
      mult("mi", "mi", 1609.344),
    ],
  },
  {
    id: "area",
    label: "Area",
    units: [
      mult("m2", "m²", 1),
      mult("cm2", "cm²", 1e-4),
      mult("mm2", "mm²", 1e-6),
      mult("km2", "km²", 1e6),
      mult("in2", "in²", 0.00064516),
      mult("ft2", "ft²", 0.09290304),
      mult("yd2", "yd²", 0.83612736),
      mult("mi2", "mi²", 2589988.11),
      mult("ha", "ha", 10000),
      mult("acre", "acre", 4046.85642),
    ],
  },
  {
    id: "volume",
    label: "Volume",
    units: [
      mult("m3", "m³", 1),
      mult("cm3", "cm³ (cc)", 1e-6),
      mult("l", "L", 0.001),
      mult("ml", "mL", 1e-6),
      mult("gal_us", "gal (US)", 0.003785411784),
      mult("gal_uk", "gal (UK)", 0.00454609),
      mult("bbl", "bbl (US oil)", 0.158987294928),
      mult("ft3", "ft³", 0.028316846592),
      mult("in3", "in³", 0.000016387064),
    ],
  },
  {
    id: "density",
    label: "Density",
    units: [
      mult("kgm3", "kg/m³", 1),
      mult("gcm3", "g/cm³", 1000),
      mult("kgl", "kg/L", 1000),
      mult("lbft3", "lb/ft³", 16.018463),
      mult("lbgal", "lb/gal (US)", 119.826427),
    ],
  },
  {
    id: "viscosity",
    label: "Viscosity (Dynamic)",
    units: [
      mult("pas", "Pa·s", 1),
      mult("cp", "cP", 0.001),
      mult("poise", "Poise (P)", 0.1),
      mult("kgms", "kg/(m·s)", 1),
      mult("lbfts", "lb/(ft·s)", 1.4881639),
    ],
  },
  {
    id: "heat_transfer",
    label: "Heat Transfer",
    units: [
      mult("wm2k", "W/(m²·K)", 1),
      mult("wm2c", "W/(m²·°C)", 1),
      mult("kwm2k", "kW/(m²·K)", 1000),
      mult("btuhrft2f", "BTU/(hr·ft²·°F)", 5.678263),
    ],
  },
];
