function dropdownFunction(event) {
    // prevent page from refreshing onclick
    event.preventDefault();
    // grab dropdown element and show the search input when clicked
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('poke-input');
    filter = input.value.toUpperCase();
    div = document.getElementById('myDropdown');
    a = div.getElementsByTagName('a');

    for (i=0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

document.getElementById("open-dropdown-btn").addEventListener('click', dropdownFunction);