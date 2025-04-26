// Файл: site-integrator.js
// Скрипт для связки и интеграции страниц информационной системы железнодорожных вокзалов

document.addEventListener('DOMContentLoaded', function() {
    // Основные страницы сайта
    const pages = [
        'index.html',  // Главная страница
        'schedule.html', // Страница расписания
        'stations.html'  // Страница вокзалов
    ];
    
    // Обнаружение текущей страницы
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Инициализация общих элементов
    initCommonElements();
    
    // Инициализация специфических элементов для текущей страницы
    initPageSpecificElements(currentPage);
    
    // Добавление обработчиков событий
    attachEventListeners();
});

/**
 * Инициализация общих элементов для всех страниц
 */
function initCommonElements() {
    // Выделение активного пункта меню
    highlightActiveNavItem();
    
    // Установка текущего года в футере
    updateFooterYear();
    
    // Проверка и настройка адаптивности
    setupResponsiveness();
    
    // Загрузка общих данных, если требуется
    loadCommonData();
}

/**
 * Выделение активного пункта в навигационном меню
 */
function highlightActiveNavItem() {
    // Определение текущей страницы
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Получение всех ссылок в навигации
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Удаление класса активности со всех ссылок
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Если ссылка соответствует текущей странице - добавляем класс active
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Обновление года в футере
 */
function updateFooterYear() {
    const footerYearElements = document.querySelectorAll('footer p');
    const currentYear = new Date().getFullYear();
    
    footerYearElements.forEach(element => {
        if (element.textContent.includes('©')) {
            element.textContent = element.textContent.replace(/\d{4}/, currentYear);
        }
    });
}

/**
 * Настройка адаптивности сайта
 */
function setupResponsiveness() {
    // Проверка размера экрана и применение соответствующих стилей или классов
    function checkScreenSize() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile-view', isMobile);
        
        // Дополнительная логика для мобильного отображения
        if (isMobile) {
            // Настройки для мобильных устройств
        }
    }
    
    // Вызов при загрузке
    checkScreenSize();
    
    // Обработчик изменения размера экрана
    window.addEventListener('resize', checkScreenSize);
}

/**
 * Загрузка общих данных для всех страниц
 */
function loadCommonData() {
    // Здесь можно загрузить общие данные, например, информацию о текущем пользователе,
    // уведомления, актуальные новости и т.д.
    
    // Проверка наличия сохраненных настроек пользователя
    const userSettings = localStorage.getItem('rzd_user_settings');
    if (userSettings) {
        applyUserSettings(JSON.parse(userSettings));
    }
}

/**
 * Применение пользовательских настроек
 */
function applyUserSettings(settings) {
    // Применение настроек пользователя, если они есть
    if (settings.theme) {
        document.body.setAttribute('data-theme', settings.theme);
    }
    
    // Другие пользовательские настройки
}

/**
 * Инициализация специфических элементов для конкретной страницы
 */
function initPageSpecificElements(currentPage) {
    switch(currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'schedule.html':
            initSchedulePage();
            break;
        case 'stations.html':
            initStationsPage();
            break;
    }
}

/**
 * Инициализация главной страницы
 */
function initHomePage() {
    // Настройка слайдера для hero секции, если есть
    setupHeroSlider();
    
    // Загрузка новостей
    loadNews();
    
    // Анимация для feature-cards
    animateFeatureCards();
}

/**
 * Настройка слайдера для hero секции
 */
function setupHeroSlider() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Здесь может быть код инициализации слайдера
    // Например, создание слайдера с изображениями вокзалов
    
    // Для простоты просто добавляем класс для анимации
    hero.classList.add('animated');
}

/**
 * Загрузка новостей на главную страницу
 */
function loadNews() {
    const newsContainer = document.querySelector('.news');
    if (!newsContainer) return;
    
    // В реальном приложении здесь был бы запрос к API за актуальными новостями
    // Для демонстрации просто добавляем дополнительные новости
    
    // Проверка, не добавлены ли уже дополнительные новости
    if (newsContainer.querySelectorAll('article').length <= 2) {
        const additionalNews = document.createElement('article');
        additionalNews.innerHTML = `
            <h3>Запуск нового скоростного маршрута</h3>
            <p>С 1 июня открывается новый скоростной маршрут между Москвой и Казанью. 
            Время в пути составит всего 3 часа 30 минут.</p>
        `;
        newsContainer.appendChild(additionalNews);
    }
}

/**
 * Анимация для карточек на главной странице
 */
function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Добавление обработчиков для анимации при наведении
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
}

/**
 * Инициализация страницы расписания
 */
function initSchedulePage() {
    // Создаем контейнер для страницы расписания, если она пустая
    const container = document.querySelector('.container');
    if (!container || container.children.length === 0) {
        setupSchedulePage();
    }
    
    // Настройка формы поиска
    setupSearchForm();
    
    // Загрузка данных расписания
    loadScheduleData();
    
    // Настройка фильтров
    setupFilters();
    
    // Настройка пагинации
    setupPagination();
}

/**
 * Настройка структуры страницы расписания
 */
function setupSchedulePage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    container.innerHTML = `
        <h1 class="page-title">Расписание поездов</h1>
        
        <form class="search-form">
            <h3>Поиск маршрутов</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="departure">Откуда</label>
                    <input type="text" id="departure" placeholder="Город отправления">
                </div>
                <div class="form-group">
                    <label for="arrival">Куда</label>
                    <input type="text" id="arrival" placeholder="Город прибытия">
                </div>
                <div class="form-group">
                    <label for="date">Дата</label>
                    <input type="date" id="date">
                </div>
            </div>
            <button type="submit" class="search-button">Найти</button>
        </form>
        
        <div class="filters">
            <button class="filter-button active" data-filter="all">Все</button>
            <button class="filter-button" data-filter="long">Дальнего следования</button>
            <button class="filter-button" data-filter="suburban">Пригородные</button>
        </div>
        
        <table class="schedule-table" id="schedule-table">
            <thead>
                <tr>
                    <th>Маршрут</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Платформа</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <!-- Здесь будут строки расписания -->
            </tbody>
        </table>
        
        <div class="pagination">
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">&raquo;</a>
        </div>
    `;
}

/**
 * Настройка формы поиска на странице расписания
 */
function setupSearchForm() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение значений из формы
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const date = document.getElementById('date').value;
        
        // Логирование для демонстрации
        console.log('Выполняется поиск маршрутов:', {
            departure,
            arrival,
            date
        });
        
        // В реальном приложении здесь был бы запрос к API
        // А пока просто перезагружаем демо-данные
        loadScheduleData(departure, arrival, date);
    });
}

/**
 * Загрузка данных расписания
 */
function loadScheduleData(departure = null, arrival = null, date = null) {
    const scheduleTable = document.querySelector('#schedule-table tbody');
    if (!scheduleTable) return;
    
    // Очистка текущих данных
    scheduleTable.innerHTML = '';
    
    // В реальном приложении здесь был бы запрос к API с параметрами
    // Для демонстрации используем статические данные
    
    // Имитация загрузки данных
    scheduleTable.innerHTML = '<tr><td colspan="6" style="text-align:center;">Загрузка данных...</td></tr>';
    
    setTimeout(() => {
        // Демо-данные маршрутов
        const routes = [
            {
                route: 'Москва - Санкт-Петербург',
                departure: '08:00',
                arrival: '12:00',
                platform: '3',
                status: 'Вовремя',
                statusClass: 'status-ontime',
                type: 'long'
            },
            {
                route: 'Москва - Казань',
                departure: '09:30',
                arrival: '16:45',
                platform: '5',
                status: 'Задерживается',
                statusClass: 'status-delayed',
                type: 'long'
            },
            {
                route: 'Москва - Одинцово',
                departure: '10:15',
                arrival: '10:50',
                platform: '2',
                status: 'Вовремя',
                statusClass: 'status-ontime',
                type: 'suburban'
            },
            {
                route: 'Москва - Тверь',
                departure: '11:20',
                arrival: '13:40',
                platform: '4',
                status: 'Отменен',
                statusClass: 'status-canceled',
                type: 'suburban'
            }
        ];
        
        // Фильтрация данных если заданы параметры поиска
        let filteredRoutes = routes;
        if (departure || arrival) {
            filteredRoutes = routes.filter(route => {
                const routeStr = route.route.toLowerCase();
                return (!departure || routeStr.includes(departure.toLowerCase())) &&
                       (!arrival || routeStr.includes(arrival.toLowerCase()));
            });
        }
        
        // Очистка таблицы перед добавлением новых данных
        scheduleTable.innerHTML = '';
        
        // Проверка наличия данных после фильтрации
        if (filteredRoutes.length === 0) {
            scheduleTable.innerHTML = '<tr><td colspan="6" style="text-align:center;">Маршруты не найдены</td></tr>';
            return;
        }
        
        // Добавление отфильтрованных маршрутов в таблицу
        filteredRoutes.forEach(route => {
            const row = document.createElement('tr');
            row.setAttribute('data-type', route.type);
            
            row.innerHTML = `
                <td>${route.route}</td>
                <td>${route.departure}</td>
                <td>${route.arrival}</td>
                <td>${route.platform}</td>
                <td><span class="status ${route.statusClass}">${route.status}</span></td>
                <td><a href="#" class="action-button">Билеты</a></td>
            `;
            
            scheduleTable.appendChild(row);
        });
        
        // Обновление обработчиков событий для кнопок покупки билетов
        attachTicketButtonHandlers();
        
    }, 500); // Имитация времени загрузки
}

/**
 * Добавление обработчиков для кнопок покупки билетов
 */
function attachTicketButtonHandlers() {
    const ticketButtons = document.querySelectorAll('.action-button');
    
    ticketButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получение информации о маршруте
            const row = this.closest('tr');
            const route = row.cells[0].textContent;
            const departure = row.cells[1].textContent;
            
            // Показ сообщения
            alert(`Переход к покупке билета на маршрут ${route} с отправлением в ${departure}`);
        });
    });
}

/**
 * Настройка фильтров для расписания
 */
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаление активного класса со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавление активного класса текущей кнопке
            this.classList.add('active');
            
            // Получение значения фильтра
            const filter = this.getAttribute('data-filter');
            
            // Применение фильтра к таблице расписания
            applyFilter(filter);
        });
    });
}

/**
 * Применение фильтра к таблице расписания
 */
function applyFilter(filter) {
    const rows = document.querySelectorAll('#schedule-table tbody tr');
    
    rows.forEach(row => {
        if (filter === 'all' || row.getAttribute('data-type') === filter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Настройка пагинации
 */
function setupPagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаление активного класса со всех ссылок
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Добавление активного класса текущей ссылке
            this.classList.add('active');
            
            // В реальном приложении здесь была бы загрузка соответствующей страницы данных
            // Для демонстрации просто показываем сообщение
            console.log('Загрузка страницы:', this.textContent);
            
            // Имитация загрузки новой страницы данных
            loadScheduleData();
        });
    });
}

/**
 * Инициализация страницы вокзалов
 */
function initStationsPage() {
    // Создаем контейнер для страницы вокзалов, если она пустая
    const container = document.querySelector('.container');
    if (!container || container.children.length === 0) {
        setupStationsPage();
    }
    
    // Настройка поисковой строки
    setupStationSearch();
    
    // Загрузка данных о вокзалах
    loadStationsData();
}

/**
 * Настройка структуры страницы вокзалов
 */
function setupStationsPage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    container.innerHTML = `
        <h1 class="page-title">Вокзалы</h1>
        
        <div class="search-bar">
            <input type="text" id="station-search" placeholder="Название вокзала или город">
            <button id="search-station-btn">🔍</button>
        </div>
        
        <div class="stations-grid" id="stations-container">
            <!-- Здесь будут карточки вокзалов -->
        </div>
    `;
}

/**
 * Настройка поисковой строки для вокзалов
 */
function setupStationSearch() {
    const searchInput = document.getElementById('station-search');
    const searchButton = document.getElementById('search-station-btn');
    
    if (!searchInput || !searchButton) return;
    
    // Обработчик для кнопки поиска
    searchButton.addEventListener('click', function() {
        searchStations(searchInput.value);
    });
    
    // Обработчик для поиска при нажатии Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchStations(this.value);
        }
    });
}

/**
 * Поиск вокзалов по заданному запросу
 */
function searchStations(query) {
    // В реальном приложении здесь был бы запрос к API
    console.log('Поиск вокзалов:', query);
    
    // Перезагрузка данных с фильтром
    loadStationsData(query);
}

/**
 * Загрузка данных о вокзалах
 */
function loadStationsData(query = null) {
    const stationsContainer = document.getElementById('stations-container');
    if (!stationsContainer) return;
    
    // Очистка текущих данных
    stationsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align:center;">Загрузка данных о вокзалах...</div>';
    
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
        // Демо-данные о вокзалах
        const stations = [
            {
                name: 'Ленинградский вокзал',
                city: 'Москва',
                address: 'Комсомольская площадь, 3',
                image: 'https://via.placeholder.com/350x200?text=Ленинградский+вокзал',
                services: ['Камеры хранения', 'Wi-Fi', 'Зал ожидания']
            },
            {
                name: 'Казанский вокзал',
                city: 'Москва',
                address: 'Комсомольская площадь, 2',
                image: 'https://via.placeholder.com/350x200?text=Казанский+вокзал',
                services: ['Камеры хранения', 'Wi-Fi', 'Комната матери и ребенка']
            },
            {
                name: 'Ярославский вокзал',
                city: 'Москва',
                address: 'Комсомольская площадь, 5',
                image: 'https://via.placeholder.com/350x200?text=Ярославский+вокзал',
                services: ['Камеры хранения', 'Wi-Fi', 'Медпункт']
            },
            {
                name: 'Московский вокзал',
                city: 'Санкт-Петербург',
                address: 'Невский проспект, 85',
                image: 'https://via.placeholder.com/350x200?text=Московский+вокзал',
                services: ['Камеры хранения', 'Wi-Fi', 'Зал повышенной комфортности']
            }
        ];
        
        // Фильтрация данных если задан поисковый запрос
        let filteredStations = stations;
        if (query) {
            const lowerQuery = query.toLowerCase();
            filteredStations = stations.filter(station => 
                station.name.toLowerCase().includes(lowerQuery) || 
                station.city.toLowerCase().includes(lowerQuery)
            );
        }
        
        // Очистка контейнера перед добавлением новых данных
        stationsContainer.innerHTML = '';
        
        // Проверка наличия данных после фильтрации
        if (filteredStations.length === 0) {
            stationsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align:center;">Вокзалы не найдены</div>';
            return;
        }
        
        // Добавление отфильтрованных вокзалов в контейнер
        filteredStations.forEach(station => {
            const card = document.createElement('div');
            card.className = 'station-card';
            
            // Создание тегов для услуг
            let servicesTags = '';
            station.services.forEach(service => {
                servicesTags += `<span class="service-tag">${service}</span>`;
            });
            
            card.innerHTML = `
                <div class="station-image" style="background-image: url('${station.image}')"></div>
                <div class="station-content">
                    <h3 class="station-name">${station.name}</h3>
                    <div class="station-info">
                        <p><strong>Город:</strong> ${station.city}</p>
                        <p><strong>Адрес:</strong> ${station.address}</p>
                    </div>
                    <div class="station-services">
                        ${servicesTags}
                    </div>
                    <a href="#" class="view-details">Подробнее</a>
                </div>
            `;
            
            stationsContainer.appendChild(card);
        });
        
        // Добавление обработчиков для кнопок "Подробнее"
        attachStationDetailsHandlers();
        
    }, 500); // Имитация времени загрузки
}

/**
 * Добавление обработчиков для кнопок "Подробнее"
 */
function attachStationDetailsHandlers() {
    const detailButtons = document.querySelectorAll('.view-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получение информации о вокзале
            const card = this.closest('.station-card');
            const stationName = card.querySelector('.station-name').textContent;
            
            // Показ сообщения
            alert(`Переход к детальной информации о вокзале: ${stationName}`);
        });
    });
}

/**
 * Добавление общих обработчиков событий
 */
function attachEventListeners() {
    // Обработчики для кнопки CTA на главной странице
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('В ближайшее время вы будете перенаправлены на страницу покупки билетов');
        });
    });
    
    // Обработчики для ссылок в футере
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const pageName = this.textContent;
                alert(`Страница "${pageName}" находится в разработке`);
            }
        });
    });
}