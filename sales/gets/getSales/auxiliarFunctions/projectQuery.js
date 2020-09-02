export const projectQuery = {
  date: '$saleDate',
  storeLocation: 1,
  customer: 1,
  couponUsed: 1,
  purchaseMethod: 1,
  items: {
    $map: {
      input: '$items',
      as: 'item',
      in: {
        name: '$$item.name',
        total: {
          $multiply: ['$$item.quantity', '$$item.price'],
        },
        unitPrice: '$$item.price',
      },
    },
  },
};
