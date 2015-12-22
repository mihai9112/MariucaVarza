var showHouseFunc = function (house) {
    var houseSelector = '.house_' + house.value;
    var selectedRow = $(houseSelector);
    if (house.checked) {
        selectedRow.show();
    } else {
        selectedRow.hide();
    }
};

var displayTextOnHtml = function (element, text) {
    element.text(text);
};

function removeCommaForLastTheRoom(text) {
    if (text.length > 11) {
        var cleanedText = text.replace(',]', ']');
        return cleanedText;
    }
    return text;
}

function addCommaIfNotLast(i, total, draftMessage) {
    if (i < total - 1) {
        draftMessage += ',';
    }
    return draftMessage;
}

function closeDraftMessage(draftMessage) {
    if (draftMessage.length > 0) {
        draftMessage += '];';
    }
    return draftMessage;
}

function addRoomsToMessage(checkedRooms, house, draftMessage) {
    var numberOfRoomsChecked = checkedRooms.length;
    if (numberOfRoomsChecked > 0) {
        draftMessage += house.getAttribute('name') + '[';
        checkedRooms.each(function (i) {
            if (this.className.indexOf(house.value) > 0) {
                draftMessage += this.value;
                draftMessage = addCommaIfNotLast(i, numberOfRoomsChecked, draftMessage);
            }
        });
    } else {
        draftMessage = '';
    }

    return draftMessage;
}

var composeDraftMessage = function (checkedHouses, checkedRooms) {
    var outputText = 'Avlb rooms:';
    var numberOfHousesChecked = checkedHouses.length;

    if (numberOfHousesChecked > 0) {
        checkedHouses.each(function (i) {
            outputText = removeCommaForLastTheRoom(outputText);
            outputText = addRoomsToMessage(checkedRooms, this, outputText);
            outputText = closeDraftMessage(outputText);
        });
    }
    displayTextOnHtml($('#output'), outputText);
};

function noRoomsAvailable() {
    displayTextOnHtml($('#output'), 'No rooms available');
}

function sendSms() {
    var smsMessage = $('#output').html();
    var status = $('#deliveryStatus');
    if (smsMessage.length > 0) {
        $.post('/sendsms', {
            message: smsMessage
        }, function (statusMessage) {
            displayTextOnHtml(status, statusMessage);
        });
    } else {
        displayTextOnHtml(status, 'Nothing to send');
    }
}

$(document).ready(function () {
    //Function to show or hide rooms for different houses
    $('.chHouse').change(function () {
        showHouseFunc(this);
    });
    //Function to add different houses and rooms that are marked as available
    $('#addRooms').click(function () {
        var checkedHouses = $('.chHouse:checked');
        var checkedRooms = $('.chRoom:checked');
        composeDraftMessage(checkedHouses, checkedRooms);
    });
    //Function to quickly mark no available rooms
    $('#noRooms').click(function () {
        noRoomsAvailable();
    });
    //Function to send an SMS
    $('#sendSms').click(function () {
        sendSms();
    });
});