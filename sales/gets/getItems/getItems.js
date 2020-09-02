import { connectMongo } from '../../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_SALES } from '../../../mongo_middleware/const';
import { ITEMSURL } from '../../const';
import { PROJECT } from './const';

const getItems = async (req, res) => {
  const { data, error } = await connectMongo(
    MONGO_COL_SALES,
    async collection => {
      try {
        const data = await collection
          .aggregate([
            { $unwind: '$items' },
            {
              $group: {
                _id: '$items.name',
                price: { $avg: { $toDouble: '$items.price' } },
                totalQuantity: { $sum: '$items.quantity' },
                revenue: {
                  $sum: {
                    $toDouble: {
                      $multiply: ['$items.quantity', '$items.price'],
                    },
                  },
                },
                tags: { $addToSet: '$items.tags' },
              },
            },
            //change _id per name
            { $project: PROJECT },
          ])
          .toArray();

        return { data };
      } catch (error) {
        return { error: `Error aggregate ${ITEMSURL}` };
      }
    }
  );

  error ? res.status(400).json({ error }) : res.status(200).json({ data });
};
export { getItems };
