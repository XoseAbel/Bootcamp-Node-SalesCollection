import { connectMongo } from '../../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_SALES } from '../../../mongo_middleware/const';
import { projectQuery } from './auxiliarFunctions/projectQuery';
import { FilterQueryMongo } from './auxiliarFunctions/FilterQueryMongo';
import { SALESURL } from '../../const';

const getSales = async (req, res) => {
  const {
    limit = 10,
    offset = 0,
    purchaseMethod,
    storeLocation,
    min_date,
    max_date,
    min_satisfaction,
    max_satisfaction,
  } = req.query;

  //construimos la query de filtros
  const filterQuery = new FilterQueryMongo(
    purchaseMethod,
    storeLocation,
    min_date,
    max_date,
    min_satisfaction,
    max_satisfaction
  );
  // console.log(filterQuery);
  const { totalData, totalCount, error } = await connectMongo(
    MONGO_COL_SALES,
    async collection => {
      try {
        const data = await collection
          .aggregate([
            {
              $facet: {
                totalData: [
                  { $match: filterQuery },
                  { $skip: offset },
                  { $limit: limit },
                  { $project: projectQuery },
                ],
                totalCount: [{ $count: 'count' }],
              },
            },
          ])
          .toArray();

        return data[0];
      } catch (error) {
        return { error: `Error aggregate ${SALESURL}` };
      }
    }
  );

  error
    ? res.status(400).json({ error })
    : res.status(200).json({ totalData, totalCount, limit, offset });
};
export { getSales };
