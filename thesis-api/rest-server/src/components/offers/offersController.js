import { offersQueryHelper } from "./offersQueries";

export const fetchOffersController = async (req, res) => {
  let payload;
  payload = req.params;
  try {
    const data = await offersQueryHelper(payload)
    return res.status(200).send(data)
    
  } catch (err) {
    console.log(err)
  }
};

