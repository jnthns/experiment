/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts

// Amplitude
const apiKey = 'f2e177f8439cb99ac2297f32dc892a1c'
const deploymentKey = 'client-19YzfjOdwGMpwK6OU0uKGz8rqXh57QSV';
const flagKey = 'sidebar';

const userId = 'Visitor 2';
const deviceId = '2ea0e37b-264a-5cfa-b449-424703520a68';

// Init Analytics and Experiment
amplitude.getInstance().init(apiKey, userId);
const experiment = Experiment.Experiment.initializeWithAmplitudeAnalytics(deploymentKey);

const user = {
    user_id: userId,
    device_id: null,
    user_properties: {
        // 'premium': true,
    }
};

// Events
var eventProperties = {
    'sidebar expanded': true
}

var homepageViewed = () => {amplitude.logEvent("Viewed Home Page", eventProperties)};
var menuExpanded = () => {amplitude.logEvent("Expanded Menu")};
var menuClosed = () => {amplitude.logEvent("Closed Menu")};

window.addEventListener('DOMContentLoaded', event => {

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

    // Fetch/Variant and Display
    const response = document.querySelector('#displayResponse');
    document.querySelectorAll('.action').forEach(button => {
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

    // TODO - Track Exposures

});


