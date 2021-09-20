// helper to valiadte Contact Number

module.exports = (contactNo) => {
    const contactRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    return (contactNo.match(contactRegex));
}