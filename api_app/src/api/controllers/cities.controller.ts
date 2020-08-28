import { Response, Request, Router } from "express";
import { CitiesService } from "../../services/cities.services";

const router: Router = Router();

router.get("/cities-from-prefix", async (req: Request, res: Response) => {
    try {
        res.status(200).json(CitiesService.getCitiesFromPrefix(req.query.prefix, +req.query.limit));
    } catch (error) {
        res.status(400);
    }
});

module.exports = router;