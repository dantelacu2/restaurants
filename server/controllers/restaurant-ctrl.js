const Restaurant = require('../models/restaurant-model')
const path = require('path');

createRestaurant = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a restaurant',
        })
    }

    const restaurant = new Restaurant(body)

    if (!restaurant) {
        return res.status(400).json({ success: false, error: err })
    }
    console.log("RESTAURANT MADE");

    restaurant
        .save()
        .then(() => {
            console.log("SENDING TO REACT");
            return res.status(201).json({
                success: true,
                name: restaurant.name,
                message: 'Rst created!',
            })
        })
        .catch(error => {
            console.log("FAILED TO SEND TO REACT");
            return res.status(400).json({
                error,
                message: 'Rst not created!',
            })
        })
}

updateRestaurant = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Rest not found!',
            })
        }
        restaurant.name = body.name
        restaurant.status = body.status
        restaurant.precautions = body.precautions
        restaurant.score = body.score
        restaurant
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: restaurant._id,
                    message: 'Rest updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Rest not updated!',
                })
            })
    })
}

deleteRestaurant = async (req, res) => {
    await Restaurant.findOneAndDelete({ _id: req.params.id }, (err, restaurant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!restaurant) {
            return res
                .status(404)
                .json({ success: false, error: `Restaurant not found` })
        }

        return res.status(200).json({ success: true, data: restaurant })
    }).catch(err => console.log(err))
}

getRestaurantById = async (req, res) => {
    await Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: restaurant })
    }).catch(err => console.log(err))
}

getRestaurants = async (req, res) => {
    await Restaurant.find({}, (err, restaurants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!restaurants.length) {
            return res
                .status(404)
                .json({ success: false, error: `Restaurant not found` })
        }
        return res.status(200).json({ success: true, data: restaurants })
    }).catch(err => console.log(err))
}

getStats = async (req, res) => {
    const spawn = require("child_process").spawn;
    var county = "Marin";
    console.log("Python Process started");
    var process = spawn('python', ['./calCountyStats.py', county]);

    process.on('error', function(err) {
        console.log("AN ERROR " + err);
    });

    console.log("AVOVE COMMENT");
    // read stdout from python
    process.stdout.on('data', function(data) { 
    console.log("READ PYTHON SCRIPT");
    var stringofdata = (data.toString());
    var result = (stringofdata.substring(1, stringofdata.length-2));
    var new_array = result.split(', ');
    new_array.push(county)
    res.json({data: new_array});
  });

  process.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
  
  process.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}



module.exports = {
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurants,
    getRestaurantById,
    getStats,
}
