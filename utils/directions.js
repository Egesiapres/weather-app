import { directions } from "./data/directions.js";
// TODO: replace arrows with icons

/**
 * Converts meteo degrees to cardinal directions and arrows.
 *
 * @function meteoDegToDirection
 *
 * @param {number} meteoDeg - The meteorological degree value (0-360).
 *
 * @returns {string} The cardinal direction with an arrow.
 *
 * @example
 * meteoDegToDirection(45); // returns "↙ NE"
 * meteoDegToDirection(180); // returns "↑ S"
 * meteoDegToDirection(270); // returns "→ W"
 */
const meteoDegToDirection = meteoDeg => {
  let direction;

  directions.forEach(el => {
    if (meteoDeg >= el.interval[0] && meteoDeg < el.interval[1]) {
      direction = `${el.arrow} ${el.direction}`;
    }
  });

  return direction;
};

export { meteoDegToDirection };
