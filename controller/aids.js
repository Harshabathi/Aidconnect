const Aid = require('../models/aid');
const dayjs = require('dayjs');
const geocode = require('../geocodeutility.js');

module.exports.index = async (req, res) => {
  let aids = await Aid.find({}).populate("donor");
  aids = aids.map(aid => ({
    ...aid.toObject(),
    postedAgo: dayjs(aid.createdAt).fromNow()
  }));
  res.render("./aids/show.ejs", { aids });
};

module.exports.newaidform = async (req, res) => {
  const recentAids = await Aid.find({
    donor: req.user._id,
    status: "available"
  }).sort({ createdAt: -1 }).limit(5);
  res.render("./aids/new.ejs", { recentAids, dayjs });
}

module.exports.postnewaid = async (req, res) => {
  let { aid } = req.body;
  let newaid = new Aid(aid);
  newaid.donor = req.user._id;
  const [longitude, latitude] = await geocode(aid.pickuplocation);
  newaid.coordinates = { type: 'Point', coordinates: [longitude, latitude] };
  await newaid.save();
  res.redirect("/aids");
}

module.exports.showaid =  async (req, res) => {
  let id = req.params.id;
  let aid = await Aid.findById(id).populate('donor');
  res.render("./aids/view.ejs", { aid, dayjs });
}

module.exports.editaidform = async (req, res) => {
  let id = req.params.id;
  let aid = await Aid.findById(id);
  res.render("./aids/edit.ejs", { aid });
}

module.exports.putedits = async (req, res) => {
  let id = req.params.id;
  const updatedAid = await Aid.findByIdAndUpdate(id, req.body.aid, { new: true, runValidators: true });
  res.redirect(`/aids/${id}`);
}

module.exports.deleteaid = async (req, res) => {
  let id = req.params.id;
  await Aid.findByIdAndDelete(id);
  req.flash("success", "Aid deleted successfully.");
  res.redirect("/aids");
}