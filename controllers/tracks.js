const Track = require("../models/track.js");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const createdTrack = await Track.create(req.body);
    res.status(201).json(createdTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundTracks = await Track.find();
    res.status(200).json(foundTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    if (!foundTrack) {
      res.status(404);
      throw new Error("track not found");
    }
    res.status(200).json(foundTrack);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete("/:trackId", async (req, res) => {
  try {
    const deleteTrack = await Track.findByIdAndDelete(req.params.trackId);
    if (!deleteTrack) {
      res.status(404);
      throw new Error("track not found");
    }
    res.status(200).json(`${deleteTrack.title} has been removed`);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.put("/:trackId", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body,
      { new: true }
    );
    if (!updatedTrack) {
      res.status(404);
      throw new Error("track not found");
    }
    res.status(200).json(updatedTrack);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});
module.exports = router;
