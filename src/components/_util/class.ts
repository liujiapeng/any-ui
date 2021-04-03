/**
 * 是否存在某class
 * @param  {HTMLElement} node
 * @param  {string} className
 * @return {Boolean}
 */
export function hasClass(node: HTMLElement, className: string): boolean {
  if (node.classList) {
    return node.classList.contains(className)
  }
  const originClass = node.className
  return ` ${originClass} `.indexOf(` ${className} `) > -1
}

/**
 * 添加class
 * @param   {HTMLElement} node
 * @param   {string}  className
 * @returns {void}
 */
export function addClass(node: HTMLElement, className: string): void {
  if (node.classList) {
    node.classList.add(className)
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`
    }
  }
}

/**
 * 移除class
 * @param   {HTMLElement} node
 * @param   {string} className
 * @returns {void}
 */
export function removeClass(node: HTMLElement, className: string): void {
  if (node.classList) {
    node.classList.remove(className)
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className
      node.className = ` ${originClass} `.replace(` ${className} `, '')
    }
  }
}
