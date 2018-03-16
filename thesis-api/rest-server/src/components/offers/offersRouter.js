import express from "express";
import { fetchOffersController } from "../offers/offersController";

const router = express.Router();
// Search for all post Current User is trying to purchase
router.route("/:user").get(fetchOffersController);

//Delete cancel offer Current User
router.route("/:post_id/:user").delete();

export default router;
