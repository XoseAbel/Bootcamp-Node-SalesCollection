import { connectMongo } from '../../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_SALES } from '../../../mongo_middleware/const';
import { CUSTOMERSURL } from '../../const';

const getCustomer = async (req, res) => {
  const { data, error } = await connectMongo(
    MONGO_COL_SALES,
    async collection => {
      try {
        const data = await collection
          .aggregate([
            {
              $group: {
                _id: null,
                satisfactionAvg: { $avg: '$customer.satisfaction' },
                maxAge: { $max: '$customer.age' },
                minAge: { $min: '$customer.age' },
                avgAge: { $avg: '$customer.age' },
                maleCount: {
                  $sum: {
                    $cond: [{ $eq: ['$customer.gender', 'M'] }, 1, 0],
                  },
                },
                femaleCount: {
                  $sum: {
                    $cond: [{ $eq: ['$customer.gender', 'F'] }, 1, 0],
                  },
                },
                customers: { $addToSet: '$customer' },
              },
            },
            { $project: { _id: 0 } },
          ])
          .toArray();

        return { data };
      } catch (error) {
        return { error: `Error aggregate ${CUSTOMERSURL}` };
      }
    }
  );

  error ? res.status(400).json({ error }) : res.status(200).json({ data });
};
export { getCustomer };
