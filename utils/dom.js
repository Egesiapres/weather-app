import { elements } from "./data/elements.js";

/**
 * Clears the value of the input field.
 *
 * @function clearInput
 *
 * @returns {void}
 *
 * @example
 * clearInput();
 */
const clearInput = () => (elements.top.form.input.value = "");

/**
 * Sets the class of a given DOM element to the specified class name.
 *
 * @function setElementClass
 *
 * @param {HTMLElement} element - The DOM element whose class is to be set.
 * @param {string} elementClass - The class name to be set on the element.
 *
 * @returns {void}
 *
 * @example
 * setElementClass(document.getElementById("my-element"), "active");
 */
const setElementClass = (element, elementClass) =>
  element.setAttribute("class", elementClass);

/**
 * Sets the class of multiple DOM elements to the specified class name.
 *
 * @function setElementsClass
 *
 * @param {Array<HTMLElement>} elements - An array of DOM elements to be set with the specified class.
 * @param {string} classToSet - The class name to be set on each element.
 *
 * @returns {void}
 *
 * @example
 * setElementsClass([document.getElementById("element1"), document.getElementById("element2")], "visible");
 */
const setElementsClass = (elements, classToSet) =>
  elements.forEach(el => setElementClass(el, classToSet));

/**
 * Hides a given DOM element by setting its class to "hidden".
 *
 * @function hideElement
 *
 * @param {HTMLElement} element - The DOM element to be hidden.
 *
 * @returns {void}
 *
 * @example
 * hideElement(document.getElementById("my-element"));
 */
const hideElement = element => setElementClass(element, "hidden");

/**
 * Sets the status of the current location button by applying the appropriate class based on the provided status.
 *
 * @function setCurrentLocationBtnStatus
 *
 * @param {"active" | "inactive"} status - The status to be applied to the current location button.
 *
 * @return {void}
 *
 * @example
 * setCurrentLocationBtnStatus("active"); // Sets the button to active state
 * setCurrentLocationBtnStatus("inactive"); // Sets the button to inactive state
 */
const setCurrentLocationBtnStatus = status =>
  setElementClass(elements.top.form.currentLocationBtn, `b-0 br-10 ${status}`);

export {
  clearInput,
  hideElement,
  setCurrentLocationBtnStatus,
  setElementClass,
  setElementsClass,
};
