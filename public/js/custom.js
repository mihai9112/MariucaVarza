import $ from 'jquery';
import {
    Helper
}
from 'helper';

var displayTextOnHtml = function (element, text) {
    element.text(text);
};

function showHouseFunc(house) {
    var houseSelector = '.house_' + house.value;
    var selectedRow = $(houseSelector);
    if (house.checked) {
        selectedRow.show();
    } else {
        selectedRow.hide();
    }
}

var getPhoneNumber = function (checkedContact) {
    return checkedContact.val();
};

$(document).ready(function () {
    //Create instance of helper class
    var instanceOfHelper = new Helper();
    var outputDraftDomElement = $('#output');
    //Function to show or hide rooms for different houses
    $('.chHouse').change(function () {
        showHouseFunc(this);
    });
    //Function to add different houses and rooms that are marked as available
    $('#addRooms').click(function () {
        var checkedHouses = $('.chHouse:checked');
        var checkedRooms = $('.chRoom:checked');
        var valuesOfHouses = [];
        var valuesOfRooms = [];

        checkedHouses.each(function () {
            valuesOfHouses.push({
                Value: this.value,
                ShortName: this.name
            });
        });

        checkedRooms.each(function () {
            valuesOfRooms.push({
                Value: this.value,
                ClassName: this.className
            });
        });

        var draftMessageText = instanceOfHelper.composeDraftMessage(valuesOfHouses, valuesOfRooms);
        displayTextOnHtml(outputDraftDomElement, draftMessageText);
    });
    //Function to quickly mark no available rooms
    $('#noRooms').click(function () {
        displayTextOnHtml(outputDraftDomElement, instanceOfHelper.noRoomsAvailable());
    });
    //Function to send an SMS
    $('#sendSms').click(function () {
        var deliveryStatusDomElement = $('#deliveryStatus');
        var checkedContacts = $('.chContact:checked');

        //Function passed to the send sms method to execute as callback when ajax request is finished
        function displayStatusMessageFromSendingSMS(statusMessage) {
            displayTextOnHtml(deliveryStatusDomElement, statusMessage);
        }

        if (checkedContacts.length === 1) {
            instanceOfHelper.sendSms(outputDraftDomElement.text(), getPhoneNumber(checkedContacts), displayStatusMessageFromSendingSMS);
        } else {
            displayTextOnHtml(deliveryStatusDomElement, 'Cannot send message to multiple contacts');
        }
    });
});

$('#menu-toggle').click(function (e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
});