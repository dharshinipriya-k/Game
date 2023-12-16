const boxes = document.querySelector(".boxes");
const modal = document.createElement("div");
modal.setAttribute("class", "modaldiv");

const boxImageUrl = [
  "https://i.pinimg.com/1200x/33/b0/e8/33b0e800f7dfd660e4b69d19e2c43ad8.jpg",
  "https://m.media-amazon.com/images/M/MV5BMWExMjhhNTctNTc2My00YWIyLTlmZDQtNDkzYzNhOWNhZGFkXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_.jpg",
  "https://rukminim2.flixcart.com/image/850/1000/xif0q/sticker/m/6/a/chhota-bheem-theme-cut-outs-chutki-medium-na-211200003387-original-imagzch8rd77stjb.jpeg?q=90",
  "https://w7.pngwing.com/pngs/330/924/png-transparent-dora-the-explorer-children-s-party-balloon-swiper-party-thumbnail.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlVK_h31VCIZPtdfjSZdtUWJYmtIlu6etiHUBTZZOrGiswYUyMSQkJs2545LM8goJrR4&usqp=CAU",
  "https://www.greengold.tv/assets/Character/CB/Bheem.jpg",
  "https://storiespub.com/wp-content/uploads/2022/12/15-731x1024.webp",
  "https://www.cartoonbucket.com/wp-content/uploads/2015/05/Laughing-Image-Of-Tom-And-Jerry.jpg",
];

const imgList = [...boxImageUrl, ...boxImageUrl];
const boxLength = imgList.length;

//Initializing important game elements
let revealCount = 0;
let waitingTime = false;
let activeBox = null;
// let clickCount = 0;

//Creating game boxes
function buildBoxes(image) {
  const element = document.createElement("div");
  element.classList.add("box");
  element.setAttribute("data-image", image); //for mapping images
  element.setAttribute("data-revealed", "false"); //Used to check revealed boxes

  //Click event
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revelaed");
    // clickCount += 1;
    // const count = document.querySelector(".count");
    // count.innerHTML = ``;

    //display the boxes and checking for reveal  and checking current element
    if (waitingTime || revealed === "true" || element == activeBox) {
      return;
    }

    if (waitingTime) {
      return;
    }
    element.style.backgroundImage = `url(${image})`;
    element.style.backgroundSize = "100px";
    element.style.backgroundRepeat = "no-repeat";

    //Checking active box
    if (!activeBox) {
      activeBox = element;
      return;
    }

    //Logic for matching images
    const imgMatch = activeBox.getAttribute("data-image");
    if (imgMatch === image) {
      activeBox.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      activeBox = null;
      waitingTime = false;
      revealCount += 2;
      if (revealCount === boxLength) {
        //Creating win popup

        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
          modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
      return;
    }

    //Change waiting time to true and using set time out instead of transition
    waitingTime = true;
    setTimeout(() => {
      element.style.backgroundImage = null;
      activeBox.style.backgroundImage = null;
      waitingTime = false;
      activeBox = null;
    }, 1000);
  });
  return element;
}

for (let i = 0; i < boxLength; i++) {
  //Randomly assigning images everytime
  const randomIndex = Math.floor(Math.random() * imgList.length);
  const image = imgList[randomIndex];
  const box = buildBoxes(image);
  imgList.splice(randomIndex, 1);
  boxes.append(box);
}
