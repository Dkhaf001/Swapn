import express from "express";
import { fetchOffersController } from "../offers/offersController";

const router = express.Router();
// Search for all post Current User is trying to purchase
router.route("/:user").get(fetchOffersController);

export default router;
