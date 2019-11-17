/**
 * insertAfter helper
 *
 * @param {Element} newNode
 * @param {Element} referenceNode
 */
export default function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
