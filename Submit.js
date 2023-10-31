
// Funzione per verificare il codice fiscale italiano
function verificaCodiceFiscale(codiceFiscale) {
    var regex = /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/;
    return regex.test(codiceFiscale);
}

// Funzione per verificare tutti i campi del modulo
function verificaCampiModulo() {
    var nome = document.querySelector('input[name="name"]').value;
    var cognome = document.querySelector('input[name="LastName"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var codiceFiscale =document.querySelector('input[name="TaxNumber"]').value;
    var DataDiNascita =document.querySelector('input[name="BirthDate"]').value;

    // Verifica che tutti i campi siano stati compilati
    if (!nome || !cognome || !email  || !codiceFiscale || !DataDiNascita) {
        return false;
    }

    // Verifica il codice fiscale
    if (!verificaCodiceFiscale(codiceFiscale)) {
        return false;
    }

    return true;
}

// Funzione per fare una chiamata AJAX
function inviaDati() {
    if (!verificaCampiModulo()) {
        alert('Per favore, compila tutti i campi del modulo.');
        return;
    }

    $.ajax({
        url: 'http://non.esistente/endpoint',
        type: 'POST',
        data: $('#form').serialize(),
        success: function(data) {
           
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                $('#ErrorConnectionModal').modal('show');
            }
        }
    });

    
}

document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelector('form.requires-validation').addEventListener('submit', function (event) {
        event.preventDefault();
        inviaDati();
        $('#ErrorConnectionModal').modal('show');

    });

 
});

