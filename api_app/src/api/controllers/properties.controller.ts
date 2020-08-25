import { Response, Request, Router } from "express";
import { property } from "lodash";

const router: Router = Router();
const unirest = require("unirest");

router.get("/list-for-rent", async (req: Request, res: Response) => {
    
    let realtorReq = unirest("GET", "https://realtor.p.rapidapi.com/properties/v2/list-for-rent");

    realtorReq.query(req.query);
    // hardcode now but should be from ENV
    realtorReq.headers({
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": "762d665b2emsh843b873a512535ap16eadfjsnd4a307820993",
        "useQueryString": true
    });

    try {
        await realtorReq.end( (realtorRes: any) => {        
            
            let properties = realtorRes.body.properties.map((prop : any) :any =>  {
                return {
                    propertyId: prop.property_id,
                    listingId: prop.listing_id,
                    price: prop.community, /* change in front-end */ 
                    // propertyType: getPropertyType(prop.prop_type)
                    // address: {
                    //     street1: string;
                    //     street2: string;
                    //     city: string;
                    //     zipcode: string;
                    //     state: string;
                    //     lat: number;
                    //     lng: number;
                    // }
                }
            });
            
            console.log(properties);

            res.status(200).json(realtorRes.body.properties);
            // res.status(200).json(properties);
        });
    } catch (e) {
        console.log(e);
    }
    
});

const getPropertyType = (propertyType: string) : string => {

    if (propertyType === "apartment" || propertyType === "condo") 
        return propertyType
    else if (propertyType === "single_family" || propertyType === "multiple_family") 
        return "house"
}

module.exports = router;