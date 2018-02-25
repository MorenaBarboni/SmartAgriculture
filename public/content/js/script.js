$(document).ready(function () {
    $(".colture-show").click(function () {
        $("#colture").show();
        $("#home").hide();
    });
    $(".home-show").click(function () {
        $("#home").show();
        $("#colture").hide();
    });

    var checkboxes = $("input[type='checkbox']"),
        actions = $("#orari_irrigazione");

    checkboxes.click(function () {

        actions.attr("hidden", checkboxes.is(":checked"));

    });
});

function check () {
    var p = document.getElementById('password');
    var pControllo = document.getElementById('verifica_password');
    if (p.value !== pControllo.value) {
        document.getElementById("controllo").innerHTML = 'Le password non coincidono';
        document.getElementById("registrazione").disabled = true;
    }
    else
        document.getElementById("controllo").innerHTML = '';
}
