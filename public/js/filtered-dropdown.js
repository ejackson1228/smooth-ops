function dropdownFunction(event) {
    event.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, option, i;
    input = document.getElementById('poke-input');
    filter = input.value.toUpperCase();
    div = document.getElementById('myDropdown');
    option = div.getElementsByTagName('option');

    for (i=0; i < option.length; i++) {
        txtValue = option[i].textContent || option[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
        } else {
            option[i].style.display = "none";
        }
    }
}

document.getElementById("open-dropdown-btn").addEventListener('click', dropdownFunction);