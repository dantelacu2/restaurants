const Restaurant = require('../models/restaurant-model')
const path = require('path');
//////stat
const { spawn } = require('child_process')

const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`)

function run() {
  const process = spawn('python', ['./calCountyStats.py', 'Marin']);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );
}

(() => {
  try {
    run()
    // process.exit(0)
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
});

//asdfsdfend

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

getStats = (req, res) => {
    run();

}



module.exports = {
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurants,
    getRestaurantById,
    getStats,
}
