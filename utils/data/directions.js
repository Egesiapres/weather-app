const directionsMapping = [
  { direction: "N", arrow: "↓", interval: [0, 11.25] },
  { direction: "N", arrow: "↓", interval: [348.75, 360] },
  { direction: "NNE", arrow: "↙", interval: [11.25, 33.75] },
  { direction: "NE", arrow: "↙", interval: [33.75, 56.25] },
  { direction: "ENE", arrow: "↙", interval: [56.25, 78.75] },
  { direction: "E", arrow: "←", interval: [78.75, 101.25] },
  { direction: "ESE", arrow: "↖", interval: [101.25, 123.75] },
  { direction: "SE", arrow: "↖", interval: [123.75, 146.25] },
  { direction: "SSE", arrow: "↖", interval: [146.25, 168.75] },
  { direction: "S", arrow: "↑", interval: [168.75, 191.25] },
  { direction: "SSW", arrow: "↗", interval: [191.25, 213.75] },
  { direction: "SW", arrow: "↗", interval: [213.75, 236.25] },
  { direction: "WSW", arrow: "↗", interval: [236.25, 258.75] },
  { direction: "W", arrow: "→", interval: [258.75, 281.25] },
  { direction: "WNW", arrow: "↘", interval: [281.25, 303.75] },
  { direction: "NW", arrow: "↘", interval: [303.75, 326.25] },
  { direction: "NNW", arrow: "↘", interval: [326.25, 348.75] },
];

export { directionsMapping };
