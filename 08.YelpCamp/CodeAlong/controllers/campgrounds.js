// ########################## models ###################################
const Campground = require('../models/campground');

module.exports.index = async(req, res) => {
    const title = 'Campgrounds';
    const camps = await Campground.find({});
    res.render('campgrounds/index', { title, camps });
};

module.exports.renderNewForm = (req, res) => {
    const title = `Add new Campground`;
    res.render('campgrounds/new', { title });
};

module.exports.createCampground = async(req, res, next) => {
    const { campground } = req.body; // name of inputs was like campground[title] and campground[location]
    campground.author = req.user._id; //adding the author in object
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // create new campground from inputs
    const newCamp = new Campground(campground);
    await newCamp.save();
    req.flash('success', 'new Campground - added Successfully!');
    res.redirect(`/campgrounds/${newCamp.id}`);
};

module.exports.renderCampgroundsDetailPage = async(req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    // console.log(camp);
    if (!camp) {
        req.flash('error', 'Cannot find that campground');
        // throw new ExpressError('camp not found', 404);
        return res.redirect('/campgrounds');
    };
    const title = `${camp.title}`;
    res.render('campgrounds/show', { title, camp });

};

module.exports.renderCampEditForm = async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        req.flash('error', 'Cannot load the edit page. somethings went wrong!!');
        // throw new ExpressError('camp not found', 404);
        return res.redirect(`/campgrounds`);
    };

    const title = `Edit - ${campground.title}`;
    res.render('campgrounds/edit', { title, camp: campground });
};

module.exports.updateCampground = async(req, res) => {
    const { id } = req.params;
    const updatedCampground = req.body.campground;
    const camp = await Campground.findByIdAndUpdate(id, {...updatedCampground }, { runValidators: true });
    req.flash('success', 'Update - Successful!');
    res.redirect(`/campgrounds/${camp.id}`);
};

module.exports.deleteCampground = async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground delete - successful!');
    res.redirect('/campgrounds');
};