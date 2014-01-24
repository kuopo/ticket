var MSGHUB_PUBSUB_URL = 'https://pubsub.msghub.io';

$(document).ready(function() {
    $('.seat').click(function() {
        var thisid = '#' + this.id;
        
        if ($(thisid).is(':checked')) {
            msghub.publish('seat_lock', {'id': thisid});
        } else {
            msghub.publish('seat_unlock', {'id': thisid});
        }
    });

    function seat_lock(ch, data) {
        $(data.id).attr('disabled', true);
    }
    
    function seat_unlock(ch, data) {
        $(data.id).attr('disabled', false);
    }


    var msghub = new MsgHub(MSGHUB_PUBSUB_URL);
    msghub.subscribe('seat_lock', seat_lock);
    msghub.subscribe('seat_unlock', seat_unlock);
});
