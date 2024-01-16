import { faker } from '@faker-js/faker';



export const getImg = async () => {
  try {
    const url = faker.image.urlPicsumPhotos();
    const res = await fetch(url);
    const img = await res.blob(); 
    return URL.createObjectURL(img);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getImgAnimal = async () => {
  try {
    const url = faker.image.url();
    const res = await fetch(url);
    const img = await res.blob(); 
    return URL.createObjectURL(img);
  } catch (e) {
    console.error(e);
    return null;
  }
};