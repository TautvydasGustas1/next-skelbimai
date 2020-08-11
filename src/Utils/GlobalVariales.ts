export const drawerWidth: number = 240;
export const computersURL: string = "computers";
export const phonesURL: string = "phones";
export const externalURL: string = "external_devices";

export function handleChangeURL(currentCategory: string) {
  let url = "";
  if (currentCategory === "Kompiuteriai") {
    url = computersURL;
  } else if (currentCategory === "Telefonai") {
    url = phonesURL;
  }
  return url;
}

export function functionAddSlugsToObjects(
  array: Array<any>,
  currentURl: string
) {
  array.forEach((item: any) => {
    item.categorySlug = currentURl;
  });

  return array;
}
