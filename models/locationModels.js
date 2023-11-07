const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new mongoose.Schema({
  region: String,
  states: [
    {
      _id: String,
      state: String,
      local_government: [
        {
          _id: String,
          local_government_name: String,
          towns: [
            {
              _id: String,
              town_name: String,
            },
          ],
        },
      ],
    },
  ],
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
