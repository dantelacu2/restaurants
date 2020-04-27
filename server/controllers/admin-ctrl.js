const Restaurant = require('../models/restaurant-model')
const path = require('path');
var unirest = require("unirest");


massAdd = async (req, res) => {
    // api call to get information
    apiRequest = unirest("GET", "http://restaurant-status-api.herokuapp.com/api/names")
    console.log("massAdd called... awaiting response from API")

    apiRequest.end(function async (apiResponse) {
        if (apiResponse.error) new Error(apiResponse.error);
        var responseArray = apiResponse.body;

        responseArray.forEach(async (ele, index) => {
            await Restaurant.find({ place_id: ele.place_id}, function (err, docs) {
            if (err) console.log("Couldn't connect to mongoose when trying to find " + err);
            // if the place couldn't be found in the database
            if (!docs.length) {
                console.log("Couldn't find the restaurant, trying to add...");

                ele["status"] = ["No dine-in", "Takeout"];
                const restaurant = new Restaurant(ele);

                if (!restaurant) {
                    console.log('restaurant of length 0');
                    return res.status(500);
                   // return res.status(400).json({ success: false, error: err })
                }
                console.log("Restaurant successfully made");
            
                restaurant
                    .save()
                    .then(() => {
                        console.log(ele.name + " Added Restaurant was sent to front-end");
                        return false;
                    })
                    .catch(error => {
                        console.log("Failed to send r to front-end error: " + error);
                        return true;
                    })
            }
            else {
                console.log("restaurant your trying to add already exists, skipping");
            }


    });
});
});
}
// helper function to delay a process
function pause(time) {
    // handy pause function to await
    return new Promise(resolve => setTimeout(resolve, time))
}

massStatusUpdate = async (req, res) => {
    console.log("MassStatusUpdate called...");
    // awaits the collection
    await Restaurant.find({}, async (err, restaurants) => {
        if (err) console.log("ERROR in find of massStatusUpdate " + err);

        //map each document
        //restaurants.map(async (restaurant) => {
        for (let step = 0; step < restaurants.length; step++) {
            console.log('START OF PAUSE');
            await pause(10000);
            var restaurant = restaurants[step];
            console.log('END OF PAUSE');
            console.log("Attemping to map status to " + restaurant.name);
            var place_name = encodeURI(restaurant.name)
            console.log("this is the link: " + "http://restaurant-status-api.herokuapp.com/api/statuses?placeName=" + place_name);
            var apiRequest = unirest("GET", "http://restaurant-status-api.herokuapp.com/api/statuses?placeName=" + place_name);
            //allow for more time to request
            await pause(10000);

            ////////******************************************** */
            ////////****************Handle API response**************************** */

            var apiResponse = await apiRequest.end(function async (apiResponse) {
                if (apiResponse.error) console.log(apiResponse.error);
                return apiResponse
            });
            console.log('new status for restaurant ' + restaurant.name + ' is ');
            var newStatus;
            try {
                var newStatus = (apiResponse.body[restaurant.name]).status;
            }
            catch(err) {
                var newStatus = restaurant.status;
            }
            console.log(newStatus);  
            // if the it exists, update database:
            if (newStatus.length > 0) {
                // find the restaurant
                await Restaurant.findOne({name: restaurant.name}, (err, found_restaurant) => {
                    if (err) console.log("ERROR IN FINDING REST.");
                    found_restaurant.status = newStatus;
                    found_restaurant
                    .save()
                    .then(() => {
                        console.log("UPDATED " + restaurant.name + " in DB");
                    })
                    .catch(error => {
                        console.log("error in posting to DB");
                        console.log(error);
                    });
                });
                console.log("succesfully changed the status of" + restaurant.name);
            }
            // don't change anything because there already exists a status
            else {
                console.log("looks like there is no new status to update");
            }
        }
    });
}



module.exports = {
    massAdd,
    massStatusUpdate,

}
