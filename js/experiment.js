var userObject = {};

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
                if (userId || deviceId) {
                    if (userProperties) {
                        try {
                            var parsedJSON = JSON.parse(userProperties);

                            if (parsedJSON && typeof parsedJSON === 'object') {
                                const user = {
                                    user_id: userId,
                                    device_id: deviceId,
                                    user_properties: parsedJSON
                                }

                                userObject = user;

                                document.querySelector('#idCheck').innerHTML = JSON.stringify(user, undefined, 4);
                            } else {
                                document.querySelector('#idCheck').innerHTML = 'User properties not a valid JSON';
                            }

                        } catch (e) {
                            console.error(e)
                            document.querySelector('#idCheck').innerHTML = 'Not a valid JSON';
                        }
                    } else {
                        const user = {
                                user_id: userId,
                                device_id: deviceId
                            };

                        userObject = user;

                        document.querySelector('#idCheck').innerHTML = JSON.stringify(user, undefined, 4);
                    }
                    
                } else if (!userId && !deviceId) {
                    document.querySelector('#idCheck').innerHTML = 'Need to send either User ID or Device ID';
                }
            }

            if (analyticsInitialized) {
                const experiment = Experiment.Experiment.initializeWithAmplitudeAnalytics(deploymentKey);
                document.querySelector('#loadMessage').style.color = 'green';
                document.querySelector('#loadMessage').innerHTML = 'Experiment Initialized';

                localStorage.setItem('exp_test_deployment_key', deploymentKey);
                localStorage.setItem('exp_test_flag_key', flagKey);

            } else {
                document.querySelector('#loadMessage').style.color = 'red';
                document.querySelector('#loadMessage').innerHTML = 'Analytics not initialized';
            }

            const experiment = Experiment.Experiment.initializeWithAmplitudeAnalytics(deploymentKey);
            document.querySelector('#loadMessage').innerHTML = 'Experiment Initialized';

            // Fetch/Variant and Display
            const response = document.querySelector('#displayResponse');
            document.querySelectorAll('.experiment').forEach(button => {
                button.addEventListener('click', async () => {
                    if (button.innerHTML == 'Fetch') {
                        const fetchedResponse = await experiment.fetch(userObject);

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
                    } else if (button.innerHTML == 'Exposure') {
                        const exposure = experiment.exposure(flagKey);

                        response.innerHTML = "Exposure Event Fired - check User Lookup!"

                        // if (exposure) {
                        //     response.innerHTML = JSON.stringify(exposure, undefined, 4);
                        // } else {
                        //     console.log(JSON.stringify(exposure))
                        //     response.innerHTML = "Error with Exposure";
                        // }
                    }
                })
            })
        })
    }
    
});


