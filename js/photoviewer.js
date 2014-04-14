/* 
var photolist = Array();

The above variable should be declared by the corresponding event photoviewer.php

*/

var photoWrapperWidth;
var AspectRatio = 4.0/3;
var MinPhotoWrapperWidth = 240;
var MinPhotoFrameHeight = Math.floor(MinPhotoWrapperWidth/AspectRatio);
var MaxPhotoWrapperWidth = 1000; //768;
var MenuWidth = 150;
var HeaderFooterHeight = 150;
var PhotoWrapperLeftRightMargin = 50;
var PhotoWrapperTopBottomMargin = 100;
var photoWrapperHeight;
var photoFrameHeight;
var ButtonSize = 30;
var MinThumbHeight = 32;
var MaxThumbHeight = 96;
var PaddingThumbPercent = 0.1;
var thumbPadding;
var thumbHeight;
var thumbWidth;
var numThumbPerPage;
var totalNumPage;
var pageind = 0;
var isPlay = true;
var MinFontSize = 0.001;
var MaxFontSize = 2;
var fontSize;
var photoind = 0;
var TimeAutoPlayPhoto = 2000;
var myTimer = setInterval(function(){AutoNextPhoto()},TimeAutoPlayPhoto);

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


function ShowPhoto(ind){
   if (ind>=0 && ind<photolist.length)
   {
      photoind = ind;
      var newImg = new Image();
      newImg.src = photolist[photoind].substring(3);

      var curHeight = 0;
      var curWidth = 0;


      
      newImg.onload = function() {
         curHeight = newImg.height;
         curWidth = newImg.width;

         document.getElementById('currentphoto').src = photolist[photoind].substring(3);
      
         if (curWidth / curHeight > AspectRatio)
         {
            document.getElementById('currentphoto').height = Math.floor(curHeight / curWidth * photoWrapperWidth);
            document.getElementById('currentphoto').width = photoWrapperWidth;
            
         }
         else
         {
            document.getElementById('currentphoto').width = Math.floor(curWidth / curHeight * photoFrameHeight);
            document.getElementById('currentphoto').height = photoFrameHeight;      
         }
      
//alert('onload: '+curWidth+', '+curHeight+'; '+document.getElementById('currentphoto').width+', '+document.getElementById('currentphoto').height);
      
         ///document.getElementById('photoindex').innerHTML = 'Photo '+(photoind+1)+'/'+photolist.length;
      }
   
       curHeight = newImg.height;
      curWidth = newImg.width;

      document.getElementById('currentphoto').src = photolist[photoind].substring(3);
   
      if (curWidth / curHeight > AspectRatio)
      {
         document.getElementById('currentphoto').height = Math.floor(curHeight / curWidth * photoWrapperWidth);
         document.getElementById('currentphoto').width = photoWrapperWidth;
         
      }
      else
      {
         document.getElementById('currentphoto').width = Math.floor(curWidth / curHeight * photoFrameHeight);
         document.getElementById('currentphoto').height = photoFrameHeight;
         
      }  
   
      
      enableDisablePhotoButton();
      
      if (parseInt(document.getElementById('photoindex').style.width)>10)
      {
         document.getElementById('photoindex').innerHTML = 'Photo '+(photoind+1)+'/'+photolist.length;
         document.getElementById('pageindex').innerHTML = 'Page '+(pageind+1)+'/'+totalNumPage;
      }
      else
      {
         document.getElementById('photoindex').innerHTML = '';
         document.getElementById('pageindex').innerHTML = '';
      }
    
      var newImgArray = Array(numThumbPerPage);
      for (i=0; i<numThumbPerPage; i++)
      {
         var thumbphotoind = pageind*numThumbPerPage+i;
         var imgid = 'photothumb-image'+i;
         if (thumbphotoind >= photolist.length)
         {
            document.getElementById(imgid).style.display = 'none';
         }
         else
         {
      
            newImgArray[i] = new Image();
            newImgArray[i].src = photolist[thumbphotoind];
            
            var curHeight = 0;
            var curWidth = 0;
            

            curHeight = newImgArray[i].height;
            curWidth = newImgArray[i].width;
   
            document.getElementById(imgid).src = photolist[thumbphotoind];
         
            if (curWidth / curHeight > AspectRatio)
            {
               document.getElementById(imgid).height = Math.floor(curHeight / curWidth * thumbWidth);
               document.getElementById(imgid).width = thumbWidth;
               
            }
            else
            {
               document.getElementById(imgid).width = Math.floor(curWidth / curHeight * thumbHeight);
               document.getElementById(imgid).height = thumbHeight;      
            }
         
            
            document.getElementById(imgid).style.display = 'inline';
            document.getElementById(imgid).onclick = (function (thisphotoind){
               return function(){
                  ShowPhoto(thisphotoind);
               };
            })(thumbphotoind);
            if (thumbphotoind!=photoind)
               document.getElementById(imgid).style.border = '0px';
            else
            {
               document.getElementById(imgid).style.border = '3px solid red';
            }
            
            newImgArray[i].onload = (function(this_i) {
               return function(){
                  curHeight = newImgArray[this_i].height;
                  curWidth = newImgArray[this_i].width;
                  
                  var imgid = 'photothumb-image'+this_i;
                  var thumbphotoind = pageind*numThumbPerPage+this_i;
                  document.getElementById(imgid).src = photolist[thumbphotoind];
            
                  if (curWidth / curHeight > AspectRatio)
                  {
                     document.getElementById(imgid).height = Math.floor(curHeight / curWidth * thumbWidth);
                     document.getElementById(imgid).width = thumbWidth;                  
                  }
                  else
                  {
                     document.getElementById(imgid).width = Math.floor(curWidth / curHeight * thumbHeight);
                     document.getElementById(imgid).height = thumbHeight;      
                  }
               }
            }) (i);
         
         }
      }
      
   }
}
function preloadImages(){
   imageObj = new Image();
   for (i=0; i<photolist.length; i++)
   {
      imageObj.src = photolist[i];
      imageObj.src = photolist[i].substring(3);
   }
}

function enableDisablePhotoButton(){
   if (photoind <= 0)
   {
      document.getElementById('firstphotobutton').disabled = true;
      document.getElementById('prevphotobutton').disabled = true;
   }
   else
   {
      document.getElementById('firstphotobutton').disabled = false;
      document.getElementById('prevphotobutton').disabled = false;      
   }

   if (photoind >= photolist.length-1)
   {
      document.getElementById('lastphotobutton').disabled = true;
      document.getElementById('nextphotobutton').disabled = true;
   }
   else
   {
      document.getElementById('lastphotobutton').disabled = false;
      document.getElementById('nextphotobutton').disabled = false;      
   }
   
   if (pageind <= 0)
      document.getElementById('prevpagebutton').disabled = true;
   else
      document.getElementById('prevpagebutton').disabled = false;

   if (pageind >= totalNumPage-1)
      document.getElementById('nextpagebutton').disabled = true;
   else
      document.getElementById('nextpagebutton').disabled = false;

}


function adjustPhotoWidth(){
   var w = getWidth();
   var h = getHeight(); 
   photoWrapperWidth = w - MenuWidth - PhotoWrapperLeftRightMargin;
   photoFrameHeight = h - HeaderFooterHeight - PhotoWrapperTopBottomMargin;
   
   if (photoWrapperWidth < MinPhotoWrapperWidth || photoFrameHeight<MinPhotoFrameHeight)
   {
      photoWrapperWidth = MinPhotoWrapperWidth;
      photoFrameHeight = MinPhotoFrameHeight;
   }
   else
   {
      if (photoWrapperWidth > MaxPhotoWrapperWidth)
        photoWrapperWidth = MaxPhotoWrapperWidth;
      photoWrapperHeight = photoWrapperWidth / AspectRatio;

      if (photoFrameHeight>photoWrapperHeight-10)
      {
         photoFrameHeight = Math.floor(photoWrapperHeight);
      }
      else
      {
         photoWrapperHeight = photoFrameHeight;
         photoWrapperWidth = Math.floor(photoFrameHeight * AspectRatio);
      }
   }   
   
   document.getElementById('photowrapper').style.width = photoWrapperWidth+"px";
   document.getElementById('photoframe').style.width = photoWrapperWidth+"px";
   document.getElementById('photoframe').style.height = photoFrameHeight+"px";
   var labelwidth = (photoWrapperWidth - 175 - 30*2)/2;
   if (labelwidth < 0)  
      labelwidth = 0;


   var delta_percent = 0.1;
   document.getElementById('photoindex').style.width = Math.floor(labelwidth*(1+delta_percent))+"px";
   document.getElementById('pageindex').style.width = Math.floor(labelwidth*(1-delta_percent))+"px";
   

   fontSize = photoWrapperWidth/MaxPhotoWrapperWidth * MaxFontSize;
   if (fontSize < MinFontSize)
      fontSize = MinFontSize;
   document.getElementById('photoindex').style.fontSize = fontSize+'em';
   document.getElementById('pageindex').style.fontSize = fontSize+'em';
   
 
   thumbHeight = Math.floor(photoFrameHeight/10);
   if (thumbHeight < MinThumbHeight)
      thumbHeight = MinThumbHeight;
   else if (thumbHeight > MaxThumbHeight)
      thumbHeight = MaxThumbHeight;
      
      
   var currentfocuspagephotoind = Math.floor(pageind * numThumbPerPage + numThumbPerPage/2);
   if (currentfocuspagephotoind > photolist.length-1)
      currentfocuspagephotoind = photolist.length-1;
   thumbWidth = Math.floor(thumbHeight * AspectRatio);
   thumbPadding = Math.floor(thumbWidth*PaddingThumbPercent);
   numThumbPerPage = Math.floor((photoWrapperWidth - thumbWidth)/(thumbWidth+thumbPadding))+1;

   totalNumPage = Math.floor((photolist.length-1) / numThumbPerPage) + 1;
   //document.getElementById('photothumb').style.paddingLeft =  Math.max(1, Math.floor((photoWrapperWidth - numThumbPerPage*thumbWidth - (numThumbPerPage-1)*thumbPadding)/2));

   if (pageind>=totalNumPage-1)
      pageind=totalNumPage-1;
   else if (pageind<0)
      pageind=0;
      
   var div = document.getElementById('photothumb');
   for (i=0; i<numThumbPerPage; i++)
   {
      var imgid = 'photothumb-image'+i;
      var img;
      if (!document.getElementById(imgid))
      {
         img = document.createElement('img');
         img.id = imgid;
         img.style.display = 'none';
         if (i!=numThumbPerPage-1)
            img.style.margin = '0 '+thumbPadding+'px 0 0';
         else
            img.style.margin = '0 0 0 0';
         img.style.height = thumbHeight;
         div.appendChild(img);
      }
      else
      {
         img = document.getElementById(imgid);
         img.style.display = 'none';
         if (i!=numThumbPerPage-1)
            img.style.margin = '0 '+thumbPadding+'px 0 0';
         else
            img.style.margin = '0 0 0 0';
         img.style.height = thumbHeight;
      }
   }
   
   for (;i<photolist.length; i++)
   {
      var imgid = 'photothumb-image'+i;
      if (!document.getElementById(imgid))
         break;
      document.getElementById(imgid).style.display = 'none';
   }
 
 
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


function photoResize(){  
   adjustPhotoWidth();
   ShowPhoto(photoind);
}

function onPhotoStart(){
   pageind = 0;
   adjustPhotoWidth();   
   ShowPhoto(0);
   preloadImages();
   addResizeEvent(photoResize);
}

function PlayPause(){
   if (isPlay) {
      document.getElementById("playpausebuttonimg").src = "../../image/play_photo.png";
      clearInterval(myTimer);
   }
   else {
      document.getElementById("playpausebuttonimg").src = "../../image/pause_photo.png";
      myTimer = setInterval(function(){AutoNextPhoto()},TimeAutoPlayPhoto);
   }   
   isPlay = !isPlay;
}


function GoToPrevPage(){
   if (pageind > 0)
   {
      pageind = pageind - 1;
      ShowPhoto(photoind);
   }
}

function AutoNextPhoto(){
   if (photoind<photolist.length-1)
      GoToNextPhoto();
   else
      GoToFirstPhoto();   
}

function GoToNextPage(){
   if (pageind < totalNumPage-1)
   {
      pageind = pageind + 1;
      ShowPhoto(photoind);
   }
}

function GoToFirstPhoto(){
   ShowPhoto(0);
}

function GoToLastPhoto(){
   ShowPhoto(photolist.length-1);
}

function GoToPrevPhoto(){
   ShowPhoto(photoind-1);
}

function GoToNextPhoto(){
   ShowPhoto(photoind+1);
}