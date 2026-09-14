# Site Articles

Це повноцінний full-stack проєкт блогу/сайту зі статтями. У ньому є фронтенд на React і бекенд на Express.js з MongoDB. Користувачі можуть реєструватися, входити в систему, переглядати статті, створювати нові записи з тегами та зображеннями, а також працювати з профілем і авторизацією.

## Що вміє проєкт

- Реєстрація та логін користувача
- JWT-авторизація
- Перегляд списку статей
- Перегляд окремої статті
- Створення, редагування та видалення статей
- Теги до статей
- Завантаження зображень для постів
- Сторінка профілю/особистого кабінету
- Дизайн на основі Material UI

## Технології

### Frontend
- React 18
- React Router DOM
- Redux Toolkit
- MUI (Material UI)
- Axios
- React Markdown / SimpleMDE
- SCSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcrypt
- multer
- express-validator
- cors

## Структура проєкту

```text
site-articles/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   ├── index.js
│   ├── validations.js
│   ├── package.json
│   └── uploads/
├── .gitignore
└── README.md              # цей файл
```

## Вимоги

Перед запуском переконайтеся, що встановлено:

- Node.js 18+
- npm або yarn
- MongoDB Atlas або локальна MongoDB

## Швидкий старт

### 1. Клонувати проєкт

```bash
git clone <your-repository-url>
cd site-articles
```

### 2. Встановити залежності бекенду

```bash
cd server
npm install
```

### 3. Встановити залежності фронтенду

```bash
cd ../client
npm install
```

### 4. Запустити сервер

```bash
cd ../server
npm run start:dev
```

Сервер працює за адресою:

- API: http://localhost:4444

### 5. Запустити клієнт

```bash
cd ../client
npm start
```

Фронтенд відкриється в браузері на:

- http://localhost:3000

## Конфігурація середовища

У поточній версії бекенду підключення до MongoDB і JWT-секрет частково захардкожені в коді, тому для нормальної роботи бажано винести їх у змінні середовища.

### Рекомендований варіант для server/

Створіть файл `.env` в папці `server/`:

```env
PORT=4444
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/blog
JWT_SECRET=your_super_secret_key
```

Після цього в `server/index.js` краще замінити рядок:

```js
mongoose.connect('...')
```

на:

```js
mongoose.connect(process.env.MONGO_URI)
```

і JWT-підписання також краще брати з `process.env.JWT_SECRET` замість захардкоженого `secret123`.

## Основні API-ендпоінти

### Авторизація

- `POST /auth/register` — реєстрація користувача
- `POST /auth/login` — логін
- `GET /auth/me` — отримання поточного користувача

### Статті

- `GET /posts` — всі статті
- `GET /posts/:id` — одна стаття
- `POST /posts` — створення статті
- `PATCH /posts/:id` — оновлення статті
- `DELETE /posts/:id` — видалення статті
- `GET /tags` або `GET /posts/tags` — теги

### Завантаження файлів

- `POST /upload` — завантаження зображення

## База даних

Проєкт використовує MongoDB. Основні моделі:

- `User` — користувачі
- `Post` — статті

Модель користувача містить:

- `fullName`
- `email`
- `passwordHash`
- `avatarUrl`

Модель статті містить:

- `title`
- `text`
- `tags`
- `viewsCount`
- `user`
- `imagesUrl`

## Розробка

### Команди серверу

```bash
cd server
npm run start:dev
```

### Команди клієнта

```bash
cd client
npm start
```

### Збірка продакшн-версії

```bash
cd client
npm run build
```

## Нотатки

- У папці `server/uploads` зберігаються файли, завантажені користувачем.
- Для локальної розробки потрібно, щоб MongoDB була доступна з поточного середовища.
- Для продакшну варто перевести унікальні значення (Mongo URI, JWT secret, CORS) у змінні середовища та захистити секрети.
- У поточній версії в проекті є жорстко задані рядки підключення та ключі, тому перед деплоєм їх варто очистити.

## Призначення проєкту

Цей проєкт — базовий блог-платформінг для публікації статей із авторизацією. Він підходить як стартова основа для:

- особистого блогу
- новинного сайту
- платформи для статей
- навчального проєкту на React + Node.js + MongoDB


## Підсумок

Це повноцінний міні-блог із React frontend і Express backend. Основна логіка вже реалізована: реєстрація, автентифікація, стовпчик статей, теги, завантаження файлів. Для запуску потрібні лише встановлення залежностей і налаштування доступу до MongoDB.
