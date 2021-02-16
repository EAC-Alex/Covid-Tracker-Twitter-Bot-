

function getFormattedDate(date) {
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1);
    var year = '' + date.getFullYear();

    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;

    return `${day}-${month}-${year}`;
}

module.exports = getFormattedDate;