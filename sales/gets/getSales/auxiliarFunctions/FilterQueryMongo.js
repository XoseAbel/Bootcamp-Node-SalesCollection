function FilterQueryMongo(
  purchaseMethod,
  storeLocation,
  min_date,
  max_date,
  min_satisfaction,
  max_satisfaction
) {
  if (purchaseMethod) {
    const regexExp = new RegExp(purchaseMethod, 'i');
    this.purchaseMethod = { $regex: regexExp };
  }
  if (storeLocation) {
    const regexExp = new RegExp(storeLocation, 'i');
    this.storeLocation = { $regex: regexExp };
  }
  if (min_date) {
    this.saleDate = {
      $gte: new Date(min_date),
    };
  }
  if (max_date) {
    this.saleDate = {
      ...this.saleDate,
      $lt: new Date(max_date),
    };
  }

  if (min_satisfaction) {
    this['customer.satisfaction'] = {
      $gte: +min_satisfaction,
    };
  }

  if (max_satisfaction) {
    this['customer.satisfaction'] = {
      ...this['customer.satisfaction'],
      $lte: +max_satisfaction,
    };
  }
}
export { FilterQueryMongo };
