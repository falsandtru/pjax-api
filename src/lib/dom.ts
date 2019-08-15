export function serialize(form: HTMLFormElement): string {
  return (Array.from(form.elements) as HTMLInputElement[])
    .filter(el => {
      if (el.disabled) return false;
      switch (el.nodeName.toLowerCase()) {
        case 'input':
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
        case 'select':
        case 'textarea':
          return true;
        default:
          return false;
      }
    })
    .filter(el =>
      typeof el.name === 'string' &&
      typeof el.value === 'string')
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