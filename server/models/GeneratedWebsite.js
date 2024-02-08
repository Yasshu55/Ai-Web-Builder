const mongoose = require('mongoose');

const generatedWebsiteSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    htmlCode:{
        type:String,
        required: true,
    },
    cssCode:{
        type:String,
        required: true,
    },
    jsCode:{
        type:String,
        required: true,
    },
});

const GeneratedWebsite = mongoose.model('GeneratedWebsite',generatedWebsiteSchema);

module.exports = GeneratedWebsite