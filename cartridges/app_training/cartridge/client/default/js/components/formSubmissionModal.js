var form = document.querySelector('#subscribeForm');
var closeBtn = document.querySelector('#close');
var closeIcon = document.querySelector('.closeIcon');
var modal = document.getElementById('modal');
var okButton = document.querySelector('.okButton');

//Send an AJAX request to submit the form data
function sendRequest() {
    var spinner = document.querySelector('.spinner');
    var text = document.querySelector('.text');
    text.style.display = 'none';
    spinner.style.display = 'block';

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var redirectUrl = document
                .querySelector('#urlContainer')
                .getAttribute('data-redirect-url');
            window.location.href = redirectUrl; //
            modal.style.display = 'none';
        } else {
            var errorText = document.querySelector('.error');
            errorText.innerText =
                'You have already subscribed to our newsletter';
            errorText.style.display = 'block';

            modal.style.display = 'none';
        }
    };
    xhr.onerror = function () {
        var errorText = document.querySelector('.error');
        errorText.style.display = 'block';
    };

    xhr.send(formData); // Send the form data
}

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        if (modal) {
            modal.style.display = 'block';
        }
    });
}

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);

closeIcon.addEventListener('click', closeModal);

okButton.addEventListener('click', sendRequest);
