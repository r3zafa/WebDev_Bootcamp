// ########################## models ###################################
const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
// #### Mapbox config ##################################################
const mbGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbGeoCoding({ accessToken: mapBoxToken });

module.exports.index = async(req, res) => {
    const title = 'Campgrounds';

    const camps = await Campground.find({});

    res.render('campgrounds/index', { title, camps, mapBoxToken });
};

module.exports.renderNewForm = (req, res) => {
    const title = `Add new Campground`;
    res.render('campgrounds/new', { title });
};

module.exports.createCampground = async(req, res, next) => {
    // forward geocoding with mapbox
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    // console.log(geoData.body.features[0].geometry.coordinates);

    const { campground } = req.body; // name of inputs was like campground[title] and campground[location]

    campground.geometry = geoData.body.features[0].geometry;
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
    const geoData = camp.geometry.coordinates;
    // console.log(geoData, mapBoxToken);
    let descriptionPreview;
    let descriptionMore;
    if (camp.description.length > 60) {
        descriptionPreview = camp.description.slice(0, 60) + ' ... more';
        descriptionMore = '... ' + camp.description.slice(61);;
    } else {
        descriptionPreview = camp.description;
    };
    // console.log('hi:', descriptionPreview, 'end', descriptionPreview.length);
    res.render('campgrounds/show', { title, camp, mapBoxToken, geoData, descriptionPreview, descriptionMore });

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
    const { campground, deleteImages } = req.body;
    // console.log(req.body.deleteImages);

    const camp = await Campground.findByIdAndUpdate(id, {...campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.images.push(...imgs);
    await camp.save();

    if (deleteImages) {
        for (let filename of deleteImages) {
            await cloudinary.uploader.destroy(filename);
        };
        await camp.updateOne({ $pull: { images: { filename: { $in: deleteImages } } } });
    };


    req.flash('success', 'Update - Successful!');
    res.redirect(`/campgrounds/${camp.id}`);
};

module.exports.deleteCampground = async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground delete - successful!');
    res.redirect('/campgrounds');
};