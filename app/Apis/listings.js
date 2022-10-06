import Client from "./Client";

const endpoint = "/listings";
const getListings = () => Client.get(endpoint);

export default {
  getListings,
};
