window.onload = loadStorage;

('use strict');
const reviewApp = document.querySelector('#reviewApp');
const submitBtn = document.querySelector('.submitBtn');
const inputTitle = document.querySelector('.input_title');
const inputComment = document.querySelector('.input_comment');
const rating = document.querySelector('#rating');
const reviewList = document.querySelector('#review__list');
const inputSearch = document.querySelector('.search_input');

function loadStorage() {
  if (localStorage.getItem('reviews')) {
    const ReviewS = JSON.parse(localStorage.getItem('reviews'));
    initialReview(ReviewS);
    initialData = ReviewS;
  }
}

let initialData = [
  {
    id: 0,
    title: 'Terminal',
    comment: 'I thought it is sad movie but it was fun!',
    score: 4,
  },
  {
    id: 1,
    title: 'Harry Potter',
    comment: 'Amaizing movie',
    score: 5,
  },
  {
    id: 2,
    title: 'Terminator : Dark Fate ',
    comment: 'It was not my style..',
    score: 2,
  },
  {
    id: 3,
    title: 'Intern',
    comment: 'This is my favorite movie',
    score: 3,
  },
  {
    id: 4,
    title: 'Emily In Paris',
    comment: 'A movie full of attractions',
    score: 5,
  },
];

orderReview();
function orderReview() {
  initialData.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  });

  initialData.sort(function (a, b) {
    return b.score - a.score;
  });
}

initialReview(initialData);
function initialReview(data) {
  orderReview();
  document.getElementById('review__list').innerHTML = '';
  for (let num in data) {
    showReviewList(data[num].title, data[num].comment, data[num].score);
  }
}

function showReviewList(title, comment, score) {
  reviewList.innerHTML += `<div class="reviewBox">
                <h2 class="title">${title}</h2>
                <p class="comment">${comment}</p>
                ${createRating(score)}
                    </div>`;
  reviewApp.appendChild(reviewList);
}

function createRating(score) {
  let span = '';
  for (let i = 0; i < score; i++) {
    span += `<span class='rating'></span>`;
  }
  return span;
}

// When add the new reivew to the list
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const titleValue = inputTitle.value;
  const commentValue = inputComment.value;
  const ratingValue = rating.value;
  addData(titleValue, commentValue, ratingValue);
  initialReview(initialData);
  resetValue();
});

function addData(titleValue, commentValue, ratingValue) {
  initialData.push({
    id: initialData.length,
    title: titleValue,
    comment: commentValue,
    score: ratingValue,
  });
  console.log(initialData);
}

function resetValue() {
  inputTitle.value = '';
  inputComment.value = '';
  rating.value = 5;
}

// When search review
inputSearch.addEventListener('keyup', (event) => {
  let filteredData = [];
  filteredData = initialData.filter((review) =>
    review.title.includes(event.target.value.trim())
  );
  initialReview(filteredData);
});

// When refresh the page, data must be still there.
window.addEventListener('beforeunload', () => {
  localStorage.setItem('reviews', JSON.stringify(storageReivews));
});
