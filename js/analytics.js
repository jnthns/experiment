var amplitudeInstance;
var analyticsInitialized = false;

// Events
// var homepageViewed = () => {amplitude.logEvent("Viewed Home Page", eventProperties)};
var menuExpanded = () => {amplitude.logEvent("Expanded Menu")};
var menuClosed = () => {amplitude.logEvent("Closed Menu")};

window.addEventListener('DOMContentLoaded', event => {

    var labels = document.querySelectorAll('.sr-only');

    if (labels.length > 0) {
        labels[0].innerHTML += ' last used: ' + localStorage.getItem('exp_test_analytics_key');
        labels[1].innerHTML += ' last used: ' + localStorage.getItem('exp_test_user_id');
        labels[2].innerHTML += ' last used: ' + localStorage.getItem('exp_test_deployment_key');
        labels[3].innerHTML += ' last used: ' + localStorage.getItem('exp_test_flag_key');
        labels[4].innerHTML += ' last used: ' + localStorage.getItem('exp_test_device_id');
    } else {
        return true;
    }

    const analyticsInit = document.querySelector('#analyticsInit');

    if (analyticsInit) {
        analyticsInit.addEventListener('click', () => {
            var analyticsKey = document.querySelector('#analyticsKey').value;
            var userId = document.querySelector('#userId').value;

            if (analyticsKey.length != 32) {
                document.querySelector('#analyticsLoadMessage').innerHTML = 'Please enter a valid Analytics Key';

            } else if (analyticsKey.length == 32) {
                if (userId) {
                    amplitudeInstance = amplitude.getInstance().init(analyticsKey, userId);
                    analyticsInitialized = true;
                    document.querySelector('#analyticsLoadMessage').innerHTML = 'Analytics Initialized for ' + String(userId);

                    localStorage.setItem('exp_test_analytics_key', analyticsKey);
                    localStorage.setItem('exp_test_user_id', userId);

                } else {
                    amplitudeInstance = amplitude.getInstance().init(analyticsKey);
                    analyticsInitialized = true;

                    document.querySelector('#analyticsLoadMessage').innerHTML = 'Analytics Initialized without User ID';
                    localStorage.setItem('exp_test_analytics_key', analyticsKey);
                }
            }
        })
    }

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));

            if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
                menuClosed();
            } else {
                menuExpanded();
            }
        });
    }
    
});


