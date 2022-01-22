function Slider() {
  this.imageUrls = [];
  this.currentImageIndex = 0;
  this.showPrevBtn = null;
  this.showNextBtn = null;
  this.slideImage = null;
  this.start = function (elId) {
    let that = this;

    let elSelector = '#' + elId;
    let el = document.querySelector(elSelector);

    this.showPrevBtn = el.querySelector('.carousel__prev-btn');
    this.showNextBtn = el.querySelector('.carousel__next-btn');
    this.slideImage = el.querySelector('.carousel__img');


    this.showPrevBtn.addEventListener('click', function(e) {
      that.onShowPrevBtnClick(e);
    });
    this.showNextBtn.addEventListener('click', function(e) {
      that.onShowNextBtnClick(e);
    });

    this.imageUrls.push('../img/slide_1.jpg');
    this.imageUrls.push('../img/slide_2.jpg');
    this.imageUrls.push('../img/slide_3.jpg');

    this.slideImage.src = this.imageUrls[this.currentImageIndex];
    this.showPrevBtn.disabled = true;
    this.showPrevBtn.style.display = 'none';
  };
  this.onShowPrevBtnClick = function(e) {
    this.currentImageIndex--;
    this.slideImage.src = this.imageUrls[this.currentImageIndex];
    // this.showNextBtn.disabled = false;
    this.showNextBtn.style.display = 'block';
    if (this.currentImageIndex === 0) {
      // this.showPrevBtn.disabled = true;
      this.showPrevBtn.style.display = 'none';
    }
  };

  this.onShowNextBtnClick = function(e) {
    this.currentImageIndex++;
    this.slideImage.src = this.imageUrls[this.currentImageIndex];
    this.showPrevBtn.style.display = 'block';
    if (this.currentImageIndex === (this.imageUrls.length - 1) ) {
      this.showNextBtn.style.display = 'none';
    }
  };
};

// export default Slider;
