var identifyProps = {};

window.addEventListener('DOMContentLoaded', event => {

    const flowResponse = document.querySelector('#flowResponse');
    const callback = document.querySelector('#fetchCallback');

    if (flowResponse) {
        document.querySelectorAll('.multistep').forEach(button => {
        button.addEventListener('click', async () => {
            if (button.innerHTML == 'Identify') {
                const analyticsKey = localStorage.getItem('exp_test_analytics_key');
                const userId = localStorage.getItem('exp_test_user_id');

                amplitude.getInstance().init(analyticsKey, userId);

                var props = document.querySelector('#userProperties').value;

                if (props) {
                    identifyProps = props;
                    amplitude.getInstance().setUserProperties(JSON.parse(props));

                    flowResponse.innerHTML = 'Identified user with properties: ' + JSON.parse(JSON.stringify(props))

                } else {
                    flowResponse.innerHTML = 'User Properties must be valid JSON';
                }

            } else if (button.innerHTML == 'Log Event') {
                var event = String(document.querySelector('#eventType').value);
                amplitude.getInstance().logEvent(event);

                flowResponse.innerHTML = 'Logged event ' + event + ' with properties ' + JSON.parse(JSON.stringify(identifyProps));

            } else if (button.innerHTML == 'Fetch') {
                const userObject = localStorage.getItem('userObject');
                const deploymentKey = localStorage.getItem('exp_test_deployment_key');

                const experiment = Experiment.Experiment.initializeWithAmplitudeAnalytics(deploymentKey);

                const fetchedResponse = await experiment.fetch(userObject);

                if (fetchedResponse) {
                    callback.innerHTML = JSON.stringify(fetchedResponse, undefined, 4);    
                } else {
                    callback.innerHTML = "Error with Fetch Request";
                }
            } 
        })
    })
}})