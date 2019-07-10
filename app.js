class Sign {
    constructor(name, result){
        this.name = name;
        this.result = result;
    }
}

class UI {
    addSign(sign){
        const list = document.getElementById('sign-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${sign.name}</td>
        <td>${sign.result}</td>
        <td><a id="result" href="#" class="delete">&#10006</a></td>
        `
        list.appendChild(row);
    }
    clearFields(){
        document.getElementById('sign-name').value = '';
        document.getElementById('sign-coords').value = '';
    }
    alertShow(message, className) {
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))
        const parent = document.getElementById('form-parent')
        const h4 = document.getElementById('h4')
        parent.insertBefore(div, h4)
        setTimeout(function() {
            document.querySelector('.alert').remove()
        }, 2000)
    }
    deleteSign(target) {
        if(target.classList.contains('delete')) {
            target.parentElement.parentElement.remove()
            return true
        }
    }
}
let coordinate = document.getElementById('sign-coords')
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        coordinate.value = "Geolocation is not supported by this browser.";
      }
  }
function showPosition(position) {
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude;
    coordinate.value = lat + ', ' + lon;
  }

document.getElementById('coords-btn').addEventListener('click', 
function(e){
    getLocation();
    showPosition(e.position);
    e.preventDefault();
})

document.getElementById('sign-form').addEventListener('submit',
function(e){
    const name = document.getElementById('sign-name').value;
    const result = document.getElementById('sign-coords').value;
    const sign = new Sign(name, result);
    const ui = new UI();

    if (name === '' & result === '') {
        ui.alertShow('Please first enter a sign simbol', 'error')
    } else if (result === '') {
        ui.alertShow('Please calculate coordinate', 'error')
    } else if (name === '') {
        ui.alertShow('Please enter a sign simbol', 'error')      
    } 
    else {
        ui.alertShow('Sign added', 'success');
        ui.addSign(sign);
        ui.clearFields();
    }
    e.preventDefault();
})

document.getElementById('sign-list').addEventListener('click', 
function(e){
    const ui = new UI()
    if(true) {
        ui.deleteSign(e.target)
        ui.alertShow('Deleted sign', 'success')        
    } else {
        console.log('error');
        
    }

    e.preventDefault()
})
