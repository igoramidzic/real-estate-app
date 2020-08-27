import { Response, Request, Router } from "express";
import { getListingForSale, getListingForSaleFaker } from "../handlers/getListingsForSale";

const router: Router = Router();

router.get("/list-for-sale", async (req: Request, res: Response) => {

    try {

        if (req.query.useFaker && req.query.useFaker === 'true') {
            res.status(200).json(await getListingForSaleFaker(req.query));
        } else {
            res.status(200).json(await getListingForSale(req.query));
        }

    } catch (error) {
        res.status(400);
    }

});

module.exports = router;