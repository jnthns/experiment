

// Exposure Tracking
const variant = experiment.variant(flagKey);
experiment.exposure(flagKey);

if (variant.value == 'treatment') {
    var header = document.querySelector(".mt-4");
    header.textContent = 'Experiment is live - Treatment variant'

    const value = variant.payload?.key;
    console.log(value);
};