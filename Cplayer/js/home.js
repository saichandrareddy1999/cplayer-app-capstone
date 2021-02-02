const app_main = document.getElementById("sec_main");
const link_home=document.getElementById("link_home");
let playersList=[];

link_home.addEventListener('click', async () =>{
    await fetchPlayers();
    setMainView(createDashBoard(playersList))
    createDashBoard(playersList);
})
function setMainView(view) {
    app_main.innerHTML = view;
  }

function createDashBoard(players){
    console.log("Create players called");
    console.log(players);

     return getPlayersView(players);
}

function getPlayersView(players){

   const before_content = `
  <div class="album py-5 bg-light">
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`;
  const after_content = `
  </div>
  </div>
  </div>
  `;

    let content="";
    for(i=0;i<players.length;i++){
        let pid=players[i]['pid'];
        console.log(pid);
        let fullName=players[i]['fullName'];
        console.log(fullName);
        let name=players[i]['name'];
        console.log(name);
        content = content + `
            <div class="card">
  <div class="card-header">
  Match Id:${pid}
  </div>
  <div class="card-body">
    <h5 class="card-title"></h5>
    <p class="card-text">${fullName}</p>
    <p class="card-text">${name}</p>
    <a href="#" class="btn btn-primary">Favorite</a>
    <a href="#" class="btn btn-primary">Recommendations</a>
  </div>
</div>
    `;
	          
                
            }
            return before_content + content + after_content;
    

}
async function searchPlayer() {
    let search_player = document.getElementById('search_player').value;
    let res = await fetch(`https://cricapi.com/api/playerFinder?name=${search_player}&apikey=vrOjz2xUo1UsvvNK27zh2oQbTq82`);
    if (res.status == 200) {
      let players = await res.json();
      console.log("Search player is called");
      console.log(players);
      setMainView(getPlayerView(players));
    } else {
      let error_msg = `<h2>No Matches found</h2>`;
      setMainView(error_msg);
    }
  }
async function fetchPlayers(){
    let res = await fetch("https://cricapi.com/api/playerFinder?name=a&apikey=vrOjz2xUo1UsvvNK27zh2oQbTq82");
    console.log(res);
    if(res.status == 200){
        let player=await res.json();
        console.log(player);
        playersList=player.data;
        console.log(playersList);
        console.log(player.data);
    }
    else{
        console.log("failed to fetch ");
    }
}
