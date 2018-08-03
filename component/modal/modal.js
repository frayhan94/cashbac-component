/**
 * Show the modal
 *
 * @param {string} elementId
 */
const showModal = (elementId) => {
    document.getElementById(elementId).style.display = 'block';
};

/**
 * Hide the modal
 *
 * @param {string} elementId
 */
const hideModal = (elementId) => {
    document.getElementById(elementId).style.display = 'none';
};