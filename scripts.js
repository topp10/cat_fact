const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://cors.io?https://cat-fact.herokuapp.com/facts');
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
    
  if (request.status >= 200 && request.status < 400) {

  //Fact calcs
        numFacts = data.all.length,
        meanUpvotes = 0,  
        maxUpvotes = 0,
        i = 0,
        facts = data.all
      
      //Count total upvotes
      for (i = 0; i < facts.length; i++) {
        meanUpvotes += facts[i].upvotes;  
          
        //Max upvote value
        if (facts[i].upvotes > maxUpvotes)
        maxUpvotes = facts[i].upvotes;
    
}
      //Calc mean upvotes
      meanUpvotes = meanUpvotes/numFacts;
      //console.log(Math.max.apply(Math, facts.map(function(o) { return o.upvotes; })));

      //Queued facts
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = "Number of Queued Facts";

      const p = document.createElement('p');
      p.textContent = numFacts;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);

      //Mean upvotes
      const card2 = document.createElement('div');
      card2.setAttribute('class', 'card');

      const h2 = document.createElement('h1');
      h2.textContent = "Mean Number of Upvotes";
      
      var data = data.all;
      const p2 = document.createElement('p');
      p2.textContent = meanUpvotes;

      container.appendChild(card2);
      card2.appendChild(h2);
      card2.appendChild(p2);
     
      
      
      //Facts with most upvotes
      data_filter = facts.filter(facts => facts.upvotes == maxUpvotes);
      
      const card3 = document.createElement('div');
      card3.setAttribute('class', 'card');

      const h3 = document.createElement('h1');
      h3.textContent = "Facts With The Most Upvotes";

      const p3 = document.createElement('p');
      
      container.appendChild(card3);
      card3.appendChild(h3);

      
      
      const URL = "https://cors.io?https://cat-fact.herokuapp.com/facts";

        const main = document.getElementById("p3");

        fetch(URL)
          .then((response) => response.json())
          .then((facts) => p3.innerHTML = getText(facts));

        const getText = (facts) => {
          const text = data.filter(votes => votes.upvotes == maxUpvotes)
            .map((facts) => `<li>${facts.text}</li>`)
            .join("\n");
          return `<ul>${text}</ul>`;
        };
        card3.appendChild(p3);
/*      
     for (i in data_filter) {
      p3.textContent += (data_filter[i].text);  
      console.log(p3.textContent);
      card3.appendChild(p3); 
      }
 */     
      
  } else {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `ERROR!`;
    app.appendChild(errorMessage);
  }
}

request.send();
