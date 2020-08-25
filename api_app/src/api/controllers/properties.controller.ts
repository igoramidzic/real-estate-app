import { Response, Request, Router } from "express";

const router: Router = Router();
const unirest = require("unirest");

router.get("/list-for-sale", async (req: Request, res: Response) => {
    
    let realtorReq = unirest("GET", "https://realtor.p.rapidapi.com/properties/v2/list-for-sale");

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
                    price: prop.price, 
                    propertyType: consolidatePropertyType(prop.prop_type),
                    // list_date: prop.list_date,
                    last_update: prop.last_update,
                    // year_built: props.year_built
                    // listing_status: prop.listing_status,
                    beds: prop.beds,
                    baths_full: prop.baths_full,
                    baths: prop.baths,
                    prop_status: "for_sale",
                    photos:  [prop.thumbnail], // just get thumbnail for now, will call another api GET to get the rest
                    sqfeet: prop.building_size.size, // adjust later to accomadate other units
                    address: {
                        line: prop.address.line,
                        city: prop.address.city,
                        postal_code: prop.address.postal_code,
                        state: prop.address.state,
                        state_code: prop.address.state_code,
                        neighborhood_name: prop.address.neighborhood_name,
                        lat: prop.address.lat,
                        lon: prop.address.lon
                    }
                }
            }).filter((prop : any) :any => prop.propertyType !== "other");
            
            console.log(properties);

            // res.status(200).json(realtorRes.body.properties);
            res.status(200).json(properties);
        });
    } catch (e) {
        console.log(e);
    }
});

const consolidatePropertyType = (propertyType: string) : string => {

    if (propertyType === "apartment" || propertyType === "condo") 
        return propertyType
    else if (propertyType === "single_family" || propertyType === "multiple_family") 
        return "house"
    else 
        return "other" 
}

module.exports = router;