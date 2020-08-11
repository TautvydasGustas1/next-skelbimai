export const drawerWidth: number = 240;
export const computersURL: string = "computers";
export const phonesURL: string = "phones";
export const externalURL: string = "external_devices";
export const monitorsURL: string = "monitors";
export const consolURL: string = "consoles";

export function handleChangeURL(currentCategory: string) {
  let url = "";
  if (currentCategory === "Kompiuteriai") {
    url = computersURL;
  } else if (currentCategory === "Telefonai") {
    url = phonesURL;
  } else if (currentCategory === "Išoriniai įrenginiai") {
    url = externalURL;
  } else if (currentCategory === "Konsolės") {
    url = consolURL;
  } else if (currentCategory === "Monitors") {
    url = monitorsURL;
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
