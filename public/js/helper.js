import $ from 'jquery';

function removeCommaForTheLastRoom(text) {
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
        draftMessage += house.ShortName + '[';
        for (var r = 0; r < numberOfRoomsChecked; r++) {
            if (checkedRooms[r].ClassName.indexOf(house.Value) > 0) {
                draftMessage += checkedRooms[r].Value;
                draftMessage = addCommaIfNotLast(r, numberOfRoomsChecked, draftMessage);
            }
        }
    } else {
        draftMessage = '';
    }

    return draftMessage;
}
export class Helper {
    composeDraftMessage(checkedHouses, checkedRooms) {
        var outputText = 'Avlb rooms:';
        var numberOfHousesChecked = checkedHouses.length;

        if (numberOfHousesChecked > 0) {
            for (var h = 0; h < numberOfHousesChecked; h++) {
                outputText = removeCommaForTheLastRoom(outputText);
                outputText = addRoomsToMessage(checkedRooms, checkedHouses[h], outputText);
                outputText = closeDraftMessage(outputText);
            }
        }

        if (outputText === '') {
            return 'No rooms selected';
        }
        return outputText;
    }

    noRoomsAvailable() {
        return 'No rooms available';
    }

    sendSms(smsMessage, callback) {
        if (smsMessage.length > 0) {
            $.post('/sendsms', {
                message: smsMessage
            }, function (statusMessage) {
                callback(statusMessage);
            });
        }
    }
}