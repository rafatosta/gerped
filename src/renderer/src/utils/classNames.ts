export function classNames(...classes: string[] | any) {
  return classes.filter(Boolean).join(' ')
}
