window.  alert("𝐨𝐩𝐞𝐧 𝐝𝐞𝐬𝐤𝐭𝐨𝐩 𝐦𝐨𝐝𝐞 𝐟𝐨𝐫 𝐁𝐄𝐓𝐓𝐄𝐑 𝐔𝐈 🙂");
const Api="AIzaSyD3o72WJh5kyp8QY1pTETa5d406zQWc1co";


const result = document.querySelector(".result");
  mostPopular();
  async function mostPopular() {
    try {
      const url1 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${Api}&maxResults=50`;
      let res = await fetch(url1);
      let data = await res.json();
      let video = data.items;
      appendVideos(video);
    } catch (err) {
      console.log(err);
    }
  }

  async function channelIcon(snippet) {
    try {
      const url2 = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=${Api}&id=${snippet.channelId}`;
      let res = await fetch(url2);
      let data = await res.json();
      snippet["channelImg"] = data.items[0].snippet.thumbnails.default.url;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchVideo() {
    try {
      let video = document.getElementById("video").value;
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video}&type=video&key=${Api}&maxResults=20`;
      let res = await fetch(url);
      let data = await res.json();
      let videos = data.items;
      appendVideos(videos);
    } catch (err) {
      console.log(err, "try next time");
    }
  }

  const appendVideos = (items) => {
    result.textContent = null;
    items.forEach(async ({ id, snippet, id: { videoId } }) => {
      let y = await channelIcon(snippet);
      let img = document.createElement("img");
      img.setAttribute("class", "channel-icon");
      img.src = snippet.channelImg;
      let div = document.createElement("div");
      div.setAttribute("class", "info");
      let h4 = document.createElement("h4");
      h4.setAttribute("class", "tittle");
      h4.textContent = snippet.title;
      let p = document.createElement("p");
      p.setAttribute("class", "channel-name");
      p.textContent = snippet.channelTitle;
      div.append(h4, p);

      let div2 = document.createElement("div");
      div2.setAttribute("class", "content");
      div2.append(img, div);
      let img1 = document.createElement("img");
      img1.setAttribute("class", "thumbnails");
      img1.src = snippet.thumbnails.medium.url;
      let final_div = document.createElement("div");
      final_div.setAttribute("class", "video");
      final_div.append(img1, div2);
      result.append(final_div);

      let data_to_send = {
        snippet,
        id: id,
        videoId,
      };

      final_div.onclick = () => {
        showVideo(data_to_send);
      };
    });
    localStorage.setItem("youtube_videos", JSON.stringify(items));
  };

  function showVideo(data) {
    localStorage.setItem("clicked_video", JSON.stringify(data));
    window.location.href = "./video_youtube.html";
  }
  let clicked_video = JSON.parse(localStorage.getItem("clicked_video"));
  let youtube_videos = JSON.parse(localStorage.getItem("youtube_videos"));
 console.log(youtube_videos)
let videoId;
  if (clicked_video.id != undefined) {
    videoId = clicked_video.id;
  }
  if (clicked_video.videoId != undefined) {
    videoId = clicked_video.videoId;
  }
  
  let video = document.querySelector(".video_big");
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.height = "100%";
  iframe.setAttribute("allowfullscreen", "true");
  iframe.width = "100%";
  let title = document.createElement("h4");
  title.textContent = clicked_video.snippet.title;
  video.append(iframe, title);

  // right side video//
  
 sideData()
  function sideData(){
    let side = document.querySelector('.side_video');
  side.textContent = null;
    youtube_videos.forEach((el)=>{
      let img = document.createElement('img');
      img.setAttribute('class',"side_img");
      img.src = el.snippet.thumbnails.medium.url;
      
      let div = document.createElement('div');
      let h4 = document.createElement('h4');
      h4.textContent = el.snippet.title;
      
      let p = document.createElement('p');
      p.textContent = el.snippet.channelTitle;
      
      div.append(h4,p);
      let divfinal = document.createElement("div");
      divfinal.append(img,div)
      side.append(divfinal)

      // side.innerHTML += `<div >
      //     <img
      //       class="side_img"
      //       src="${el.snippet.thumbnails.medium.url}"
      //       alt=""
      //     />
      //     <div>
      //       <h4>${el.snippet.title}</h4>
      //       <p>${el.snippet.channelTitle}</p>
      //     </div>`
      
      let data_to_send = {
        snippet : el.snippet,
        videoId: el.id.videoId,
        id: el.id
      };
      divfinal.onclick = () => {
        showVideo(data_to_send);
      };
      // divfinal.addEventListener('click',function(){
      //   console.log("yes")
      //   console.log(el)
      // })
    })

  }
  function showVideo(data) {
    localStorage.setItem("clicked_video", JSON.stringify(data));
    window.location.href = "video_youtube.html";
  }

