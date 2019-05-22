/**
 * A callback method that is invoked immediately after the
 * DOM is it change.
 */
export function pgOnInit(
    target: any,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
) {
    window.addEventListener('load', propertyDesciptor.value());
}