/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/

// TODO - store keys for ease of access 

var amplitudeInstance;
var analyticsInitialized = false;

// Events
// var homepageViewed = () => {amplitude.logEvent("Viewed Home Page", eventProperties)};
var menuExpanded = () => {amplitude.logEvent("Expanded Menu")};
var menuClosed = () => {amplitude.logEvent("Closed Menu")};

window.addEventListener('DOMContentLoaded', event => {
    const infoTable = document.querySelector('#savedInfo');

    if (infoTable) {
        document.querySelector('#savedApiKey').innerHTML = localStorage.getItem('exp_test_analytics_key');
        document.querySelector('#savedExpKey').innerHTML = localStorage.getItem('exp_test_deployment_key');
        document.querySelector('#savedFlagKey').innerHTML = localStorage.getItem('exp_test_flag_key');
        document.querySelector('#savedUserId').innerHTML = localStorage.getItem('exp_test_user_id');
        document.querySelector('#savedDeviceId').innerHTML = localStorage.getItem('exp_test_device_id');
    }

    const analyticsInit = document.querySelector('#analyticsInit');

    if (analyticsInit) {
        analyticsInit.addEventListener('click', () => {
            var analyticsKey = document.querySelector('#analyticsKey').value;
            var userId = document.querySelector('#userId').value;

            if (analyticsKey.length != 32) {
                alert('Please enter a valid Analytics Key');

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


