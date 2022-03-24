// const deploymentKey = 'client-19YzfjOdwGMpwK6OU0uKGz8rqXh57QSV';
// const flagKey = 'sidebar';

window.addEventListener('DOMContentLoaded', event => {
    const onKeySubmit = document.querySelector('#onKeySubmit');
    if (onKeySubmit) {
        onKeySubmit.addEventListener('click', () => {
            const deploymentKey = document.querySelector('#deploymentKey').value;
            const flagKey = document.querySelector('#flagKey').value;
            const userId = document.querySelector('#userId').value;
            const deviceId = document.querySelector('#deviceId').value;
            const userProperties = document.querySelector('#userProperties').value;
            
            if (deploymentKey == '' || flagKey == '') {
                alert('Please enter your Experiment Keys');
            } else if (deploymentKey.startsWith('client-') && flagKey.length > 0) {
                localStorage.setItem('deploymentKey', deploymentKey);
                localStorage.setItem('flagKey', flagKey);
            }

            const experiment = Experiment.Experiment.initializeWithAmplitudeAnalytics(deploymentKey);
            document.querySelector('#loadMessage').innerHTML = 'Experiment Initialized';

            if (!userId) {
                document.querySelector('#idCheck').innerHTML = 'Make sure to send Device ID if not setting a user ID';
                if (userId || deviceId) {
                    const user = {
                        user_id: userId,
                        device_id: deviceId,
                        user_properties: userProperties
                    };

                    document.querySelector('#idCheck').innerHTML = JSON.stringify(user, undefined, 4);
                }
            } else if (!userId && !deviceId) {
                document.querySelector('#idCheck').innerHTML = 'Need to send either User ID or Device ID';
            } 

            // Fetch/Variant and Display
            const response = document.querySelector('#displayResponse');
            document.querySelectorAll('.experiment').forEach(button => {
                button.addEventListener('click', async () => {
                    if (button.innerHTML == 'Fetch') {
                        const fetchedResponse = await experiment.fetch(user);

                        if (fetchedResponse) {
                            response.innerHTML = JSON.stringify(fetchedResponse, undefined, 4);    
                        } else {
                            response.innerHTML = "Error with Fetch Request";
                        }

                    } else if (button.innerHTML == 'Variant') {
                        const variant = experiment.variant(flagKey);

                        if (variant) {
                            response.innerHTML = JSON.stringify(variant, undefined, 4);
                        } else {
                            response.innerHTML = "Error with Variant Request";
                        }
                    }
                })
            })
        })
    }

    
});


