(function() {
    let ERROR_CLASS = 'contact-form-input-error'
    let $submitBtn = document.getElementById('submit-contact-form');

    let submitForm = (event) => {
        try {
            event.preventDefault();

            let data = {};

            if (!validate())
                return false;

            let body = '<h2>Contact from Byrro.dev:</h2>';

            for (name in formField) {
                body += '<p><b>'+ name +'</b>:'+ formField[name].value +'</p>';
            }

            Email.send({
                SecureToken: "2ee52e1e-343f-42c2-8607-6a23211e38ad",
                To: 'renato@byrro.dev',
                From: 'renato@byrro.dev',
                Subject: 'Byrro.dev: Freelance Content Writer',
                Body: body,
            }).then(
                message => {
                    if (message == 'OK') {
                        clearForm();
                        document.getElementById('submit-success-msg').style.display = 'block'
                    } else {
                        handleError({'message': message});
                    }
                }
            );
        } catch(e) {
            handleError({'error': e});
        }
    }

    let formField = {
        'Name': document.getElementById('form_name'),
        'E-mail': document.getElementById('form_email'),
        'Message': document.getElementById('form_message'),
    }

    let handleError = (d) => {
        if(d.hasOwnProperty('message')) {
            console.error('Email service error:');
            console.error(message)
        } else if (d.hasOwnProperty('error')) {
            console.error('Javascript error:');
            console.error(d.error);
        }
    }

    let validate = () => {
        let valid = true;

        for (name in formField) {
            let $field = formField[name];
            let value = $field.value;

            if (typeof value !== 'string' || value.length == 0) {
                $field.classList.add(ERROR_CLASS);
                valid = false;
            }
        }

        return valid;
    }

    let clearForm = () => {
        Object.values(formField).forEach((field => field.value = ''));
    }

    let fieldFocus = (e) => {
        e.target.classList.remove(ERROR_CLASS);
        document.getElementById('submit-success-msg').style.display = 'none';
    }

    $submitBtn.addEventListener('click', submitForm);

    Object.values(formField).forEach(($field) => {
        $field.addEventListener('focus', fieldFocus)
    });
})()