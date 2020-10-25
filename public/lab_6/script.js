function randInt(min, max) {
  mini = Math.ceil(min);
  maxi = Math.floor(max);
  return Math.floor(Math.random() * (maxi - mini + 1) + mini);
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sort(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const form = $(e.target).serializeArray(); 
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      console.log(fromServer)
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const array1 = range(10);
      const array2 = array1.map(() => {
        const number = randInt(0,243);
        return fromServer[number];
      });

      const reverseList = array2.sort((a, b) => sort(b, a, 'name'));
      const ul = document.createElement('ol');
      ul.className = 'flex-inner';
      $('form').prepend(ul);
      reverseList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value= ${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name} </label>`);
        $(ul).append(li);
      });

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});