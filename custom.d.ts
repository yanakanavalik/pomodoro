// custom.d.ts
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.svg" {
  // eslint-disable-next-line
  const content: any;
  export default content;
}
