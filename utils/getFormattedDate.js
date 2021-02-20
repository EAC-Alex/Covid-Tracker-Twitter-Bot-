

function getFormattedDate(date, inversed=false) {
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1);
    var year = '' + date.getFullYear();

    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;

    return inversed ? `${year}-${month}-${day}` : `${day}-${month}-${year}`;
}

module.exports = getFormattedDate;