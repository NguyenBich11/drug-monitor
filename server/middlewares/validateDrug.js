module.exports = function validateDrug(req, res, next) {
    let { name, dosage, card, pack, perDay } = req.body;

    // ép kiểu số
    card = Number(card);
    pack = Number(pack);
    perDay = Number(perDay);

    // a. Name length > 5
    if (!name || name.trim().length <= 5) {
        return res.status(400).json({ message: "❌ Drug name must be more than 5 characters." });
    } 
    // b. Dosage format
    else if (!dosage || !/^\d+-morning,\d+-afternoon,\d+-night$/.test(dosage)) {
        return res.status(400).json({ 
            message: "❌ Dosage must follow format: XX-morning,XX-afternoon,XX-night (X = digit)." 
        });
    } 
    // c. Card > 1000
    else if (isNaN(card) || card <= 1000) {
        return res.status(400).json({ message: "❌ Tablets per Card must be more than 1000." });
    } 
    // d. Pack > 0
    else if (isNaN(pack) || pack <= 0) {
        return res.status(400).json({ message: "❌ Tablets per Pack must be more than 0." });
    } 
    // e. PerDay > 0 and < 90
    else if (isNaN(perDay) || perDay <= 0 || perDay >= 90) {
        return res.status(400).json({ message: "❌ Taken per day must be between 1 and 89." });
    }

    // ✅ Passed all checks
    req.body.card = card;
    req.body.pack = pack;
    req.body.perDay = perDay;
    next();
};