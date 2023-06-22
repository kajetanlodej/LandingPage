document.addEventListener('DOMContentLoaded', function () {
    var refreshInput = document.querySelector('.status input');

    refreshInput.addEventListener('click', function () {
        this.classList.add('rotate-animation');
        var self = this;
        setTimeout(function () {
            self.classList.remove('rotate-animation');
        }, 500);
        //handleRefreshClick();
    });
});
function makeSyncingRequest() {
    const rpcEndpoint = 'https://idenanode.com';
    const payload = {
        method: 'bcn_syncing',
        params: [],
        id: 1,
        key: '1Solon1',
    };

    return axios.post(rpcEndpoint, payload)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}
makeSyncingRequest()
    .then(data => {
        console.log(data);
        // Check if 'syncing' field is true
        if (data.result.syncing) {
            // Check if 'currentBlock' and 'highestBlock' are both not 0 and 'currentBlock' is less than 'highestBlock'
            if (data.result.currentBlock !== 0 && data.result.highestBlock !== 0 && data.result.currentBlock < data.result.highestBlock) {
                $("#RPC").html('Synchronizing (' + (parseInt(data.result.highestBlock) - parseInt(data.result.currentBlock)) + ' block(s) left)').css('color', '#ff9300');;
            } else {
                $("#RPC").html('Synchronizing').css('color', '#ff9300');;
            }
        } else {
            // Display "Online" if 'syncing' is false
            $("#RPC").html('Online').css('color', '#009900');;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display "Offline" if an error is thrown
        $("#RPC").html('Offline').css('color', ' #e62e00');
    });
function handleRefreshClick() {
    // Call the makeSyncingRequest() function
    makeSyncingRequest()
        .then(data => {
            console.log(data);
            // Check if 'syncing' field is true
            if (data.result.syncing) {
                // Check if 'currentBlock' and 'highestBlock' are both not 0 and 'currentBlock' is less than 'highestBlock'
                if (data.result.currentBlock !== 0 && data.result.highestBlock !== 0 && data.result.currentBlock < data.result.highestBlock) {
                    $("#RPC").html('Synchronizing (' + (parseInt(data.result.highestBlock) - parseInt(data.result.currentBlock)) + ' block(s) left)').css('color', 'black');
                    setTimeout(function () {
                        $("#RPC").css('color', '#ff9300');
                    }, 350);

                } else {
                    $("#RPC").html('Synchronizing').css('color', 'black');

                    setTimeout(function () {
                        $("#RPC").css('color', '#ff9300');
                    }, 350);

                }
            } else {
                // Display "Online" if 'syncing' is false
                $("#RPC").html('Online').css('color', 'black');
                setTimeout(function () {
                    $("#RPC").css('color', 'green');
                }, 350);
            }


        })
        .catch(error => {
            console.error('Error:', error);
            // Display "Offline" if an error is thrown
            $("#RPC").html('Offline').css('color', 'black');
            setTimeout(function () {
                $("#RPC").css('color', '#e62e00');
            }, 350);
        });
}

$(document).on('click', '#reload', handleRefreshClick);