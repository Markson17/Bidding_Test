const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../../models/users.model');
const handleUpload = require('../../utils/upload');

// GET USER DETAILS
const getUserDetails = expressAsyncHandler(async (req, res) => {
  const userId = req?.query?.id;

  try {
    const userDetails = await UserModel.findById(userId?.toString());

    if (!userDetails) {
      return res.status(404).json({ message: 'User Details is empty' });
    }

    return res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// CHANGE PROFILE PICTURE

const changeProfile = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUser = req?.body?.userId;

    const User = await UserModel.findById(loggedInUser.toString());

    if (!User) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    User.image = imageUrl;

    await User.save();
    return res
      .status(200)
      .json({ message: 'Profile updated successfully', User });
  } catch (error) {
    res.status(500).json(error?.message);
    console.log(error);
  }
});

// UPDATE PROFILE
const updateProfile = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const { location, phone_number, username } = req?.body;

    const getUser = await UserModel.findById(userId?.toString());

    if (!getUser) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    getUser.location = location;
    getUser.phone_number = phone_number;
    getUser.username = username;

    await getUser.save();
    return res
      .status(200)
      .json({ message: 'Profile updated successfully', getUser });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = { getUserDetails, updateProfile, changeProfile };
