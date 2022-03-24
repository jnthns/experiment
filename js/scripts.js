/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts

// Amplitude
// const apiKey = 'f2e177f8439cb99ac2297f32dc892a1c'
// const userId = 'Visitor 2';
// const deviceId = '2ea0e37b-264a-5cfa-b449-424703520a68';

var amplitudeInstance;

// Events
// var homepageViewed = () => {amplitude.logEvent("Viewed Home Page", eventProperties)};
var menuExpanded = () => {amplitude.logEvent("Expanded Menu")};
var menuClosed = () => {amplitude.logEvent("Closed Menu")};

window.addEventListener('DOMContentLoaded', event => {

    const analyticsInit = document.querySelector('#analyticsInit');
    if (analyticsInit) {
        analyticsInit.addEventListener('click', () => {
            const analyticsKey = document.querySelector('#analyticsKey').value;
            const userId = document.querySelector('#userId').value;

            if (analyticsKey.length != 32) {
                alert('Please enter your Analytics Key');
            } else if (analyticsKey.length == 32) {
                if (userId) {
                    amplitudeInstance = amplitude.getInstance().init(analyticsKey, userId);
                    document.querySelector('#analyticsLoadMessage').innerHTML = 'Analytics Initialized for ' + String(userId);
                }
            }
        }
    )}

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


