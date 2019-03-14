const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  // Makes a fetch call to the above app...
    .then(response => response.json())
    // jsonify the response
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    // passes json object into the function below to create html for us
    .catch(error => console.error({ error }));
    // unless there is an error which will give us a console log error message of error
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = () => {
  var name = getElementById("name").value
  var hogletsCount = getElementById("hoglets").value
  var allergies = getElementById("allergies").value
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      hoglets: hogletsCount,
      allergies: allergies
    })
  })
  .then(response => response.json())
  .then(hedgehogs => appendHedgehogs(hedgehogs))
  .catch(error => console.error({ error }));
};

const unInviteHedgehog = (id) => {
  var name = getElementById("name").value
  var hogletsCount = getElementById("hoglets").value
  var allergies = getElementById("allergies").value
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites/${id}', {
    method: 'DELETE',
    headers: { 'Access-Control-Allow-Methods': 'DELETE' }
    })
  })
  .then(response => {getHedgehogs()})
  .catch(error => console.error({ error }));
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
