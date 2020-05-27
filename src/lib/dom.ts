export function serialize(form: HTMLFormElement): string {
  return [...form.elements]
    .filter((el: HTMLInputElement | HTMLElement): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => {
      if (!('name' in el)) return false;
      if (el.disabled) return false;
      switch (el.tagName) {
        case 'INPUT':
          switch (el.type.toLowerCase()) {
            case 'checkbox':
            case 'radio':
              return el.checked;
            case 'submit':
            case 'button':
            case 'image':
            case 'reset':
            case 'file':
              return false;
            default:
              return true;
          }
        case 'SELECT':
        case 'TEXTAREA':
          return true;
        default:
          return false;
      }
    })
    .map(el =>
      [
        encodeURIComponent(removeInvalidSurrogatePairs(el.name)),
        encodeURIComponent(removeInvalidSurrogatePairs(el.value)),
      ].join('='))
    .join('&');

  function removeInvalidSurrogatePairs(str: string): string {
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '');
  }
}
