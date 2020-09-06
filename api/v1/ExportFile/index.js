const pdf = require('html-pdf');
const pdfTemplate = require('./documents/Contract');

module.exports.CreateFile =  (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
};
module.exports.ExFile = (req, res)=>{
    res.sendFile(`${__dirname}/result.pdf`)
}
/*
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})*/