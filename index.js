// script.js 파일

// 옵션 설정
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTgzZjlmY2JiNzEwNTdlMjE0YWViOGI1N2E4MWMxOCIsInN1YiI6IjY2MjhhZWU4NjNkOTM3MDE4Nzc2OGQ0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j6S6llPjU3qy6DN5eFupq2G3j_GXFDh5BtlOhVzHyzQ'
    }
};

// 영화 데이터를 가져오는 API 호출
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json()) // 응답을 JSON 형식으로 변환
    .then(data => {
        const movies = data.results; // 받아온 영화 데이터 배열

        // 카드 컨테이너 요소를 선택
        const cardContainer = document.querySelector('.row-cols-1');

        // 영화 카드를 렌더링하는 함수 호출
        renderMovies(movies);

        // 검색 버튼 클릭 이벤트 핸들러 등록
        document.getElementById('button-addon2').addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput').value.trim(); // 검색어를 가져옴 trim(양쪽 공백 제거)

            // 검색어가 비어 있는지 확인
            if (searchInput === "") {
                // 검색어가 비어 있으면 알림 창 표시
                alert('검색어를 입력해주세요.');
                return; // 검색어가 없으므로 함수를 여기서 종료
            }

            const filteredMovies = movies.filter(movie => {
                // 영화 제목에 검색어가 포함되어 있는지 확인
                return movie.title.toLowerCase().includes(searchInput.toLowerCase());
            });

            // 검색 결과를 화면에 출력
            renderMovies(filteredMovies);
        });

    })
    .catch(err => console.error(err)); // 오류가 발생하면 콘솔에 오류 메시지 출력


// 함수 추가: 영화 배열을 받아서 화면에 출력하는 함수
function renderMovies(movies) {
    const cardContainer = document.querySelector('.row-cols-1');
    // 기존 카드 모두 삭제
    cardContainer.innerHTML = '';

    if (movies.length === 0) {
        // 검색 결과가 없는 경우 alert 창으로 알림
        alert('일치하는 영화가 없습니다.');
        location.reload();  //초기화
    } else {
        // 각 영화에 대해 카드를 생성하고 화면에 추가
        movies.forEach(movie => {
            const card = document.createElement('div'); // div 요소 생성
            card.classList.add('col'); // col 클래스 추가
            // 카드의 내용을 HTML로 작성(카드 만들기)
            card.innerHTML = `
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.overview}</p>
                        </div>
                        <div class="rating-container">
                            <p class="card-average">평점: ${movie.vote_average}</p>
                        </div>
                    </div>
                </div>
            `;
            const img = card.querySelector('.card-img-top');
            img.addEventListener('click', () => {
                // 모달 창 열기
                const modal = document.getElementById('myModal');
                const modalTitle = document.getElementById('modalTitle');
                modalTitle.textContent = movie.title; // 모달 창 제목 설정

                const modalContent = document.getElementById('modalContent');
                modalContent.textContent = movie.overview; // 모달 창 내용 설정

                const modalId = document.getElementById('modalId');
                modalId.textContent = `ID: ${movie.id}`; // 모달 창 내용 설정
                modal.style.display = "block";

                // 모달 창 닫기 버튼 이벤트
                const closeBtn = document.getElementsByClassName("close")[0];
                closeBtn.addEventListener('click', () => {
                    modal.style.display = "none"; // 모달 창 숨기기
                });

                // 모달 창 바깥 클릭 시 모달 창 닫기
                window.addEventListener('click', (event) => {
                    if (event.target == modal) {
                        modal.style.display = "none"; // 모달 창 숨기기
                    }
                });
            });
            // 생성한 카드를 카드 컨테이너에 추가
            cardContainer.appendChild(card);
        });
    }

    //초기화
    document.getElementById('reset').addEventListener('click', () => {
        const reset2 = document.getElementById('reset')
        location.reload();
    });
}

