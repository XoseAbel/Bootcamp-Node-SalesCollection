export const PROJECT = {
  name: '$_id',
  _id: 0,
  price: 1,
  totalQuantity: 1,
  revenue: 1,
  tags: { $arrayElemAt: ['$tags', 0] },
};
