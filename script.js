{
    let songElements = Array.from(document.getElementsByClassName("song"));
    let masterPlayButton = document.getElementById("masterPlay");
    let audioElement = new Audio();
    let myprogressBar = document.getElementById('myprogress');
    let gif = document.getElementById("gif");
    let songNameBottom = document.getElementById("SongNameBottom");
    let songIndex = 0;
    let previous = document.getElementById("previous");
    let next = document.getElementById("next");

   
   

    let songs = [
        {songSource:"Songs/Nuvvani Idhi Needani.mp3" , name:"Nuvvani Idhi Needani", image:"Songs/maharshi.jpg"},
        {songSource:"Songs/Meriseti Poova.mp3" , name:"Meriseti Poova", image:"Songs/narasimha.jpg"},
        {songSource:"Songs/Billa Theme Song.mp3" , name:"Billa Theme Song", image:"Songs/billa.jpg"},
        {songSource:"Songs/My Name is Billa.mp3" , name:"My Name is Billa", image:"Songs/billa.jpg"},
        {songSource:"Songs/Jeevitamante Poraatam.mp3" , name:"Jeevitamante Poraatam", image:"Songs/narasimha.jpg"},
        {songSource:"Songs/Gangsta's-Paradise.mp3" , name:"Gangsta's-Paradise", image:"Songs/gansta.jpg"},
        {songSource:"Songs/Mastaaru Mastaaru.mp3" , name:"Mastaaru Mastaaru", image:"Songs/sir.jpg"}
    ]
    
    songElements.forEach((element , i) => {
      
        element.getElementsByTagName("img")[0].src = songs[i].image;
        element.getElementsByTagName("span")[0].innerText = songs[i].name;
    })
   
    
   
    audioElement.src = songs[songIndex].songSource;
    songNameBottom.innerText = songs[songIndex].name;

    masterPlayButton.addEventListener('click' ,()=>{
        
       if(audioElement.paused || audioElement.currentTime <=0){ 
        audioElement.play();
        masterPlayButton.classList.remove('fa-circle-play');
        masterPlayButton.classList.add('fa-circle-pause');
        gif.style.opacity = '1';
       }else{
        audioElement.pause();
        masterPlayButton.classList.remove('fa-circle-pause');
        masterPlayButton.classList.add('fa-circle-play');
        gif.style.opacity = '0';
        makeAllPlayButtons(songs.length);
        
       }

    }

    );

    audioElement.addEventListener('timeupdate' , ()=>{
       myprogressBar.value = parseInt((audioElement.currentTime/audioElement.duration)* 100)
       if(audioElement.currentTime == audioElement.duration){
        masterPlayButton.classList.remove('fa-circle-pause');
        masterPlayButton.classList.add('fa-circle-play');
        next.click();
       }
    });

    myprogressBar.addEventListener('change' , ()=>{
        audioElement.currentTime = ((myprogressBar.value*parseInt(audioElement.duration))/100)
    });
     
    songElements.forEach((element)=>{
        let e =  element.getElementsByTagName("i")[0];
       e.addEventListener('click' , ()=>{

            if(!(audioElement.paused) && songIndex == e.id){
              audioElement.pause();
              makeAllPlayButtons(songs.length);
              gif.style.opacity = '0';
              masterPlayButton.classList.remove('fa-circle-pause');
              masterPlayButton.classList.add('fa-circle-play');
              
            }else{
            songIndex = e.id;
            e.classList.remove('fa-circle-play');
            e.classList.add('fa-circle-pause');
            makeAllPlayButtons(parseInt(e.id));
            audioElement.src = songs[songIndex].songSource;
            songNameBottom.innerText = songs[songIndex].name;
            audioElement.play();
            gif.style.opacity = '1';
            masterPlayButton.classList.remove('fa-circle-play');
            masterPlayButton.classList.add('fa-circle-pause');
            }
           
        });
    })

   function makeAllPlayButtons(currentIndex){
     songElements.forEach((element , i) =>{
        if(currentIndex != i){
        element.getElementsByTagName("i")[0].classList.remove('fa-circle-pause');
        element.getElementsByTagName("i")[0].classList.add('fa-circle-play');
        }
     })
   }

   previous.addEventListener('click' , ()=>{
       if(songIndex <7 && songIndex > 0){
         songIndex -= 1;
       }else {
            songIndex = 6;
       }
           audioElement.src = songs[songIndex].songSource;
            songNameBottom.innerText = songs[songIndex].name;
            audioElement.play();
            gif.style.opacity = '1';
            masterPlayButton.classList.remove('fa-circle-play');
            masterPlayButton.classList.add('fa-circle-pause');
   });
   next.addEventListener('click' , ()=>{
    if(songIndex >=0 && songIndex < 6){
      songIndex += 1;
    }else {
      songIndex=0;
    }
    
         audioElement.src = songs[songIndex].songSource;
         songNameBottom.innerText = songs[songIndex].name;
         audioElement.play();
         gif.style.opacity = '1';
         masterPlayButton.classList.remove('fa-circle-play');
         masterPlayButton.classList.add('fa-circle-pause');
});
    
}