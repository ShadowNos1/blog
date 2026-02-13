# Laravel + React Blog (Dockerized)

Современное приложение для ведения блога, реализованное на **Laravel** (REST API) и **React** (Vite). Проект полностью контейнеризирован с использованием **Docker Compose** для простоты развертывания и разработки.

---

## Особенности

| Компонент | Описание |
|-----------|---------|
| **Backend** | Laravel 11 + PHP 8.4 + MySQL 8.0 |
| **Frontend** | React 19 + Vite + Axios + React Router |
| **Архитектура** | RESTful API с Docker Compose |
| **База данных** | MySQL с персистентностью данных |

---

## API Endpoints

```
GET    /api/articles              — Получить список всех статей
GET    /api/articles/{id}         — Получить статью по ID
GET    /api/articles/{id}/comments — Получить комментарии статьи
POST   /api/articles              — Создать новую статью
POST   /api/articles/{id}/comments — Добавить комментарий к статье
```

---

## Требования

### Обязательные
- **Docker** >= 20.10
- **Docker Compose** >= 2.0

### Опциональные (для локальной разработки)
- **Node.js** >= 18.0 (для фронтенда)
- **PHP** >= 8.2 (для бэкенда)
- **MySQL** >= 8.0 (если не используется Docker)

---

## Быстрый старт

### Шаг 1: Подготовка переменных окружения

```bash
cp backend/.env.example backend/.env
```

### Шаг 2: Запуск Docker-контейнеров

```bash
docker-compose up -d --build
```

Подождите несколько секунд, пока контейнеры полностью инициализируются.

### Шаг 3: Настройка Backend

Выполните следующие команды для установки зависимостей и настройки БД:

```bash
# Установка PHP зависимостей
docker exec -it blog-app composer install

# Генерация ключа приложения
docker exec -it blog-app php artisan key:generate

# Запуск миграций и заполнение тестовыми данными
docker exec -it blog-app php artisan migrate:fresh --seed
```

### Шаг 4: Запуск Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Доступ к приложению

| Сервис | URL |
|--------|-----|
| Frontend (Vite dev server) | http://localhost:5173 |
| Backend API | http://localhost:8080/api |
| MySQL | localhost:3306 |

---

## Структура проекта

```
blog/
├── backend/                    # Laravel приложение
│   ├── app/                   # Исходный код
│   ├── database/              # Миграции и seed-данные
│   ├── routes/                # API маршруты
│   └── .env.example           # Пример конфигурации
├── frontend/                  # React приложение
│   ├── src/                   # Исходный код React
│   ├── package.json           # Зависимости npm
│   └── vite.config.js         # Конфигурация Vite
├── docker-compose.yml         # Docker Compose конфиг
├── nginx.conf                 # Nginx конфигурация
└── README.md                  # Этот файл
```

---

## Решение проблем

### Ошибка прав доступа (Permission Denied)

Если при работе контейнера возникают ошибки записи в директории `storage` или `cache`:

```bash
docker exec -u root -it blog-app chown -R www-data:www-data \
  /var/www/storage \
  /var/www/bootstrap/cache
```

### Ошибка баз данных ("Base table or view not found")

Убедитесь, что миграции запущены:

```bash
docker exec -it blog-app php artisan migrate
```

### Контейнер не запускается

Проверьте логи:

```bash
docker-compose logs -f blog-app
```

### Сбросить базу данных

Для полного сброса БД и повторного заполнения данных:

```bash
docker exec -it blog-app php artisan migrate:fresh --seed
```

---

## Полезные команды

### Docker Compose

```bash
docker-compose up -d              # Запустить контейнеры в фоне
docker-compose logs -f            # Просмотр логов в реальном времени
docker-compose down               # Остановить контейнеры
docker-compose restart            # Перезагрузить контейнеры
docker exec -it blog-app bash     # Войти в контейнер
```

### Laravel (Backend)

```bash
php artisan migrate              # Запустить миграции
php artisan db:seed              # Заполнить БД начальными данными
php artisan tinker               # Интерактивная оболочка Laravel
php artisan cache:clear          # Очистить кэш
```

### Frontend

```bash
npm run dev                       # Запустить dev сервер (Vite)
npm run build                     # Собрать для продакшена
npm run lint                      # Проверить код (ESLint)
```

---

## Разработка

### Локальный запуск без Docker

**Backend:**
```bash
cd backend
composer install
php artisan serve                 # Запустится на http://localhost:8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev                       # Запустится на http://localhost:5173
```

---

# Установка зависимостей Composer
docker exec -it blog-app composer install

# Генерация ключа приложения
docker exec -it blog-app php artisan key:generate

# Запуск миграций и наполнение базы тестовыми данными (3-5 статей)
docker exec -it blog-app php artisan migrate:fresh --seed
4. Запуск Frontend
Перейдите в папку frontend, установите зависимости и запустите сервер разработки:

Bash

cd frontend
npm install
npm run dev
Доступ к проекту
Frontend: http://localhost:5173

Backend API: http://localhost:8080/api/articles

База данных (MySQL): localhost:3306

Решение проблем (Troubleshooting)
Права доступа (Permission Denied)
Если возникают ошибки записи в логи или кэш внутри контейнера, выполните:

Bash

docker exec -u root -it blog-app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
Ошибка отсутствия таблиц
Если API выдает ошибку Base table or view not found, убедитесь, что вы запустили миграции:

Bash

docker exec -it blog-app php artisan migrate
