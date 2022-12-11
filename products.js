import axios from "axios";
import { setTimeout } from "timers/promises";

const ICM_DOMAIN = 'https://icm.aexp-static.com';
const ICM_PATH = 'Internet/MemberGetMember/Pages';
const ICM_LOCALE = 'US_en';
const ICM_FILE_NAME = 'mgmoffer.json';
const WAIT_TIME = 3000;

export const getAllProducts = async () => {
  await setTimeout(WAIT_TIME);
  const productMap = await callICM();

  const productKeys = Object.keys(productMap)
    .filter(id =>
      !isNaN(parseInt(id))
      && !id.includes(",")
      && !(productMap[id].HEADER.CARD_ART.includes("LegacyCardArt")));

  return productKeys
    .map(productId => ({[productId]: getProductWithId(productMap, productId)}))
}

export const getProduct = async (productId) => {
  await setTimeout(WAIT_TIME);
  const productMap = await callICM();
  return getProductWithId(productMap, productId);
}

export const callICM = async () => {
  const response = await axios.get(`${ICM_DOMAIN}/${ICM_PATH}/${ICM_LOCALE}/${ICM_FILE_NAME}`);
  const { data: { productoffermap } } = response;
  return productoffermap;
}

const getProductWithId = (productMap, productId) => {
  const product = productMap[productId];
  if (product) product['ID'] = productId;
  return product;
}
