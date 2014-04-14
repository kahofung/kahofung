/*
 *
var videoinfo = Array();
var videoduration = Array();
var videolist = Array();

The above variables should be first defined by calling videoinfo.php from the corresponding event php file

*/


var AspectRatio = 4.0/3;
var MinVideoWrapperWidth = 240;
var MinVideoFrameHeight = Math.floor(MinVideoWrapperWidth/AspectRatio);
var MaxVideoWrapperWidth = 1000; //768;
var MenuWidth = 150;
var HeaderFooterHeight = 150;
var VideoWrapperLeftRightMargin = 50;
var VideoWrapperTopBottomMargin = 100;
var videoWrapperWidth = 480;
var videoWrapperHeight = 360;
var videoFrameHeight;
var ButtonSize = 30;
var MinVideoThumbHeight = 32;
var MaxVideoThumbHeight = 96;
var PaddingThumbPercent = 0.1;
var videoThumbPadding;
var videoThumbHeight;
var videoThumbWidth;
var numVideoThumbPerPage;
var totalNumVideoPage;
var videopageind = 0;
var MinVideoFontSize = 0.001;
var MaxVideoFontSize = 4;
var videoFontSize;
var videoind = 0;



// Beginning of Youtube player

        // create youtube player
        var player;
        var isYoutubeAPIReady = false;

        function onYouTubePlayerAPIReady() {
            isYoutubeAPIReady = true;
         if (!player)
         {

              player = new YT.Player('videoframe', {
              height: videoFrameHeight,
              width: videoWrapperWidth,
              playerVars: { 'rel': 0 },
              videoId: videolist[videoind],
              events: {
                   'onReady': onPlayerReady,
                   'onStateChange': onPlayerStateChange
                 }
               });
         }
        }

        // autoplay video
        function onPlayerReady(event) {
            isYoutubeAPIReady = true;
            event.target.playVideo();
        }

        // when video ends
        function onPlayerStateChange(event) {
            isYoutubeAPIReady = true;
         
            if(event.data === 0) {          
                if (videoind < videolist.length-1)
                    ShowVideo(videoind+1);
                    UpdateVideoThumb();
            }
        }

// end of Youtube API
    
    
function getWidth() {
    if (self.innerWidth) {
       return self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight){
        return document.documentElement.clientWidth;
    }
    else if (document.body) {
        return document.body.clientWidth;
    }
    return 0;
}


function getHeight() {
    if (self.innerHeight) {
       return self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight){
        return document.documentElement.clientHeight;
    }
    else if (document.body) {
        return document.body.clientHeight;
    }
    return 0;
}

function ShowVideo(ind){
   if (ind>=0 && ind<videolist.length)
   {      
      videoind = ind;
      
      if (isYoutubeAPIReady)
      {
         player.stopVideo();
         player.loadVideoById(videolist[videoind]);
         player.playVideo();
      }

      if (parseInt(document.getElementById('videoindex').style.width)>10)
      {
         document.getElementById('videoindex').innerHTML = 'Page '+(videopageind+1)+'/'+totalNumVideoPage;
      }
      else
      {
         document.getElementById('videoindex').innerHTML = '';
      }      
   }
}

function UpdateVideoThumb(){

   if (parseInt(document.getElementById('videoindex').style.width)>10)
   {
      document.getElementById('videoindex').innerHTML = 'Page '+(videopageind+1)+'/'+totalNumVideoPage;
   }
   else
   {
      document.getElementById('videoindex').innerHTML = '';
   }
 
   var newImgArray = Array(numVideoThumbPerPage);
   
   for (i=0; i<numVideoThumbPerPage; i++)
   {
      var thumbvideoind = videopageind*numVideoThumbPerPage+i;
      var imgid = 'videothumb-image'+i;
      if (thumbvideoind >= videolist.length)
      {
         document.getElementById(imgid).style.display = 'none';
         spanid = 'videothumb-caption'+i;
         document.getElementById(spanid).innerHTML = '';
         document.getElementById(spanid).style.padding = "0";
      }
      else
      {
   
         newImgArray[i] = new Image();
         newImgArray[i].src = "http://img.youtube.com/vi/"+videolist[thumbvideoind]+"/2.jpg";
         
         var curHeight = 0;
         var curWidth = 0;
         
         curHeight = newImgArray[i].height;
         curWidth = newImgArray[i].width;

         document.getElementById(imgid).src = "http://img.youtube.com/vi/"+videolist[thumbvideoind]+"/2.jpg";
      
         if (curWidth / curHeight > AspectRatio)
         {
            curHeight = document.getElementById(imgid).height = Math.floor(curHeight / curWidth * videoThumbWidth);
            curWidth = document.getElementById(imgid).width = videoThumbWidth;
            
            
         }
         else
         {
            curWidth = document.getElementById(imgid).width = Math.floor(curWidth / curHeight * videoThumbHeight);
            curHeight = document.getElementById(imgid).height = videoThumbHeight;      
         }
      
         
         document.getElementById(imgid).style.display = 'inline';
         var divid = "videothumb-div"+i;
         document.getElementById(divid).title = videoinfo[thumbvideoind];
         document.getElementById(divid).onclick = (function (thisvideoind){
            return function(){
               ShowVideo(thisvideoind);
               UpdateVideoThumb();
            };
         })(thumbvideoind);

         if (thumbvideoind!=videoind)
            document.getElementById(imgid).style.border = '0px';
         else
         {
            document.getElementById(imgid).style.border = '3px solid red';
         }
         
         newImgArray[i].onload = (function(this_i) {
            return function(){
               curHeight = newImgArray[this_i].height;
               curWidth = newImgArray[this_i].width;
               
               var imgid = 'videothumb-image'+this_i;
               var thumbvideoind = videopageind*numVideoThumbPerPage+this_i;
               document.getElementById(imgid).src = "http://img.youtube.com/vi/"+videolist[thumbvideoind]+"/2.jpg";
         
               if (curWidth / curHeight > AspectRatio)
               {
                  curHeight = document.getElementById(imgid).height = Math.floor(curHeight / curWidth * videoThumbWidth);
                  curWidth = document.getElementById(imgid).width = videoThumbWidth;                  
               }
               else
               {
                  curWidth = document.getElementById(imgid).width = Math.floor(curWidth / curHeight * videoThumbHeight);
                  curHeight = document.getElementById(imgid).height = videoThumbHeight;      
               }
               
               spanid = 'videothumb-caption'+this_i;
               document.getElementById(spanid).innerHTML = videoduration[thumbvideoind];
            }
         }) (i);
      
               
         spanid = 'videothumb-caption'+i;
         document.getElementById(spanid).innerHTML = videoduration[thumbvideoind];
  
      }
   }

   enableDisableVideoButton();

}

function enableDisableVideoButton(){
   
   if (videopageind <= 0)
      document.getElementById('videoprevpagebutton').disabled = true;
   else
      document.getElementById('videoprevpagebutton').disabled = false;

   if (videopageind >= totalNumVideoPage-1)
      document.getElementById('videonextpagebutton').disabled = true;
   else
      document.getElementById('videonextpagebutton').disabled = false;

}


function adjustVideoWidth(){
   var w = getWidth();
   var h = getHeight(); 
   videoWrapperWidth = w - MenuWidth - VideoWrapperLeftRightMargin;
   videoFrameHeight = h - HeaderFooterHeight - VideoWrapperTopBottomMargin;
   
   if (videoWrapperWidth < MinVideoWrapperWidth || videoFrameHeight<MinVideoFrameHeight)
   {
      videoWrapperWidth = MinVideoWrapperWidth;
      videoFrameHeight = MinVideoFrameHeight;
   }
   else
   {
      if (videoWrapperWidth > MaxVideoWrapperWidth)
        videoWrapperWidth = MaxVideoWrapperWidth;
      videoWrapperHeight = videoWrapperWidth / AspectRatio;

      if (videoFrameHeight>videoWrapperHeight)
      {
         videoFrameHeight = Math.floor(videoWrapperHeight);
      }
      else
      {
         videoWrapperHeight = videoFrameHeight;
         videoWrapperWidth = Math.floor(videoFrameHeight * AspectRatio);
      }
   }   
   
   document.getElementById('videowrapper').style.width = videoWrapperWidth+"px";
   document.getElementById('videoframe').style.width = videoWrapperWidth+"px";
   document.getElementById('videoframe').style.height = videoFrameHeight+"px";

   if (isYoutubeAPIReady)
   {
      player.setSize(videoWrapperWidth+"px",videoFrameHeight+"px");
   }

   var labelwidth = (videoWrapperWidth - 30*2);
   if (labelwidth < 0)  
      labelwidth = 0;

   document.getElementById('videoindex').style.width = labelwidth+"px";
   

   videoFontSize = videoWrapperWidth/MaxVideoWrapperWidth* MaxVideoFontSize;
   if (videoFontSize < MinVideoFontSize)
      videoFontSize = MinVideoFontSize;
   document.getElementById('videoindex').style.videoFontSize = videoFontSize+'em';
   
 
   videoThumbHeight = Math.floor(videoFrameHeight/5);
   if (videoThumbHeight < MinVideoThumbHeight)
      videoThumbHeight = MinVideoThumbHeight;
   else if (videoThumbHeight > MaxVideoThumbHeight)
      videoThumbHeight = MaxVideoThumbHeight;
      
   document.getElementById('videothumb').style.height = (videoThumbHeight+10)+'px';
      
   var currentfocuspagevideoind = Math.floor(videopageind * numVideoThumbPerPage + numVideoThumbPerPage/2);
   if (currentfocuspagevideoind > videolist.length-1)
      currentfocuspagevideoind = videolist.length-1;
   videoThumbWidth = Math.floor(videoThumbHeight * AspectRatio);
   videoThumbPadding = Math.floor(videoThumbWidth*PaddingThumbPercent);
   numVideoThumbPerPage = Math.floor((videoWrapperWidth - videoThumbWidth)/(videoThumbWidth+videoThumbPadding))+1;

   totalNumVideoPage = Math.floor((videolist.length-1) / numVideoThumbPerPage) + 1;

   if (videopageind>=totalNumVideoPage-1)
      videopageind=totalNumVideoPage-1;
   else if (videopageind<0)
      videopageind=0;


   var div = document.getElementById('videothumb');
   for (i=0; i<numVideoThumbPerPage; i++)
   {
      var imgid = 'videothumb-image'+i;
      var img;
      if (!document.getElementById(imgid))
      {
         div2 = document.createElement('div');
         div2.id = 'videothumb-div'+i;
         div2.style.position = "relative";
         div2.style.cssFloat = "left";
         div2.style.display = "table-cell";
         
         img = document.createElement('img');
         img.id = imgid;
         img.style.display = 'none';
         if (i!=numVideoThumbPerPage-1)
            img.style.margin = '0 '+videoThumbPadding+'px 0 0';
         else
            img.style.margin = '0 0 0 0';
         img.style.height = videoThumbHeight;
         div2.appendChild(img);
         
         span = document.createElement('span');
         spanid = 'videothumb-caption'+i;
         span.id = spanid;
         span.style.position = "absolute";
         span.style.padding = "3px";//span.style.padding = "3px";
         span.style.bottom = "10px";
         
         if (i!=numVideoThumbPerPage-1)
            span.style.right = Math.floor(videoThumbPadding*1.3)+"px";
         else
            span.style.right = Math.floor(videoThumbPadding*0.3)+"px";
         span.style.color = "white";         
         span.style.fontFamily = "courier, arial, times";
         span.style.fontSize = Math.floor(videoThumbHeight/5)+"px";
         span.style.fontWeight = "bold";
         span.style.backgroundColor = "black";
         span.style.opacity = "0.65";
         div2.appendChild(span);
         
         div.appendChild(div2);
   
      }
      else
      {
         img = document.getElementById(imgid);
         img.style.display = 'none';
         if (i!=numVideoThumbPerPage-1)
            img.style.margin = '0 '+videoThumbPadding+'px 0 0';
         else
            img.style.margin = '0 0 0 0';
         img.style.height = videoThumbHeight;
         
         spanid = 'videothumb-caption'+i;
         span = document.getElementById(spanid);
         span.style.fontSize = Math.floor(videoThumbHeight/5)+"px";         
         span.style.padding = "3px";//span.style.padding = "3px";
         document.getElementById(spanid).innerHTML = '';
         
         if (i!=numVideoThumbPerPage-1)
            span.style.right = Math.floor(videoThumbPadding*1.3)+"px";
         else
            span.style.right = Math.floor(videoThumbPadding*0.3)+"px";
         
      }
   }


   for (;i<videolist.length; i++)
   {
      var imgid = 'videothumb-image'+i;
      if (!document.getElementById(imgid))
         break;
      document.getElementById(imgid).style.display = 'none';
      
      spanid = 'videothumb-caption'+i;
      span = document.getElementById(spanid);
      document.getElementById(spanid).innerHTML = '';
      span.style.padding = "0";

   }

 
   UpdateVideoThumb();
}


function addResizeEvent(func) {
    var oldResize = window.onresize;
    window.onresize = function () {
        func();
        if (typeof oldResize === 'function') {
            oldResize();
        }
    };
}

function videoResize(){  
    adjustVideoWidth();
}

function onVideoStart(){
   videopageind = 0;
   
 //if filename is a external JavaScript file
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", "http://www.youtube.com/player_api");
  if (typeof fileref!="undefined")
     document.getElementsByTagName("html")[0].appendChild(fileref);

   adjustVideoWidth();
    
   addResizeEvent(videoResize);

}


function GoToPrevVideoPage(){
   if (videopageind > 0)
   {
      videopageind = videopageind - 1;
      UpdateVideoThumb();
   }
}

function GoToNextVideoPage(){
   if (videopageind < totalNumVideoPage-1)
   {
      videopageind = videopageind + 1;
      UpdateVideoThumb();
   }
}