import { SALESURL, CUSTOMERSURL, ITEMSURL } from './const';
import { getSales } from './gets/getSales/getSales';
import { getCustomer } from './gets/getCustomer/getCustomer';
import { getItems } from './gets/getItems/getItems';

const init = app => {
  //sales information
  app.get(SALESURL, getSales);
  //customer information
  app.get(CUSTOMERSURL, getCustomer);
  //items information
  app.get(ITEMSURL, getItems);
};
export default init;
