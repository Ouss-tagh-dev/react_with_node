import React, { useState } from 'react';

function NomPrenom() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [info, setInfo] = useState('');

  const afficher = (e) => {
    e.preventDefault();
    setInfo(`Votre nom est ${nom} et votre prénom est ${prenom}`);
  };

  return (
    <div className="App">
      <form onSubmit={afficher}>
        <div>
          <input
            type="text"
            placeholder="Nom"
            onChange={(e) => {
              setNom(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Prénom"
            onChange={(e) => {
              setPrenom(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Afficher</button>
        </div>
      </form>
      <p>{info}</p>
    </div>
  );
}

export default NomPrenom;
