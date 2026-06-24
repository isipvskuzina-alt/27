# Краткий ответ на задания

---

## 1️⃣ РАБОТА С ФОНОМ

### 📌 **background-color** — цвет фона

```css
.element {
    background-color: #6c5ce7;
    background-color: rgb(108, 92, 231);
    background-color: rgba(108, 92, 231, 0.5);
    background-color: transparent;
}
```

**В проекте:**
```css
body { background-color: #f0f2f5; }
.calculator { background-color: #1a1a2e; }
.btn { background-color: #2a2a4a; }
.btn:hover { background-color: #3a3a5a; }
```

---

### 📌 **background-image** — фоновое изображение

```css
/* 1. URL изображения */
.element {
    background-image: url('image.jpg');
}

/* 2. Градиент */
.element {
    background-image: linear-gradient(90deg, #6c5ce7, #a29bfe);
    background-image: radial-gradient(circle, #6c5ce7, #2d3436);
}

/* 3. Несколько изображений */
.element {
    background-image: url('top.png'), url('bottom.png');
}

/* 4. SVG (встроенное) */
.element {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%236c5ce7"/></svg>');
}
```

**В проекте:**
```css
.app {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" opacity="0.03"><circle cx="50" cy="50" r="40" fill="none" stroke="%236c5ce7" stroke-width="2"/></svg>');
}
```

---

### 📌 **background-size** — размер фона

```css
/* 1. Конкретные размеры */
.element {
    background-size: 200px 100px;
}

/* 2. cover — заполняет весь элемент */
.element {
    background-size: cover;
}

/* 3. contain — помещается целиком */
.element {
    background-size: contain;
}

/* 4. Проценты */
.element {
    background-size: 50% 50%;
}
```

**В проекте:**
```css
.app {
    background-size: 200px 200px;
}
```

---

### 📌 **background-repeat** — повторение фона

```css
background-repeat: repeat;    /* Повтор (по умолчанию) */
background-repeat: repeat-x;  /* Только по горизонтали */
background-repeat: repeat-y;  /* Только по вертикали */
background-repeat: no-repeat; /* Не повторять */
background-repeat: space;     /* Равномерное распределение */
background-repeat: round;     /* Масштабирование */
```

**В проекте:**
```css
.app {
    background-repeat: repeat;
}
```

---

### 📌 **Сокращённая запись**

```css
.element {
    background: #f0f2f5 url('pattern.png') center/200px repeat fixed;
}
```

**Порядок:**
```
background: color image position/size repeat attachment
```

---

## 2️⃣ ОТОБРАЖЕНИЕ СПИСКА В REACT С .map()

### 📌 **Что такое .map()?**

`.map()` — метод массива, создающий новый массив, преобразуя каждый элемент.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]
```

---

### 📌 **Базовый синтаксис в React**

```jsx
function ItemList() {
    const items = ['Яблоко', 'Банан', 'Апельсин'];
    
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}
```

---

### 📌 **Список объектов**

```jsx
function UserList() {
    const users = [
        { id: 1, name: 'Иван' },
        { id: 2, name: 'Мария' },
        { id: 3, name: 'Петр' }
    ];
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

---

### 📌 **Сложные компоненты**

```jsx
function ProductList() {
    const products = [
        { id: 1, name: 'Ноутбук', price: 50000 },
        { id: 2, name: 'Телефон', price: 30000 }
    ];
    
    return (
        <div className="products">
            {products.map(product => (
                <ProductCard 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </div>
    );
}
```

---

### 📌 **Важность key**

```jsx
// ✅ ХОРОШО — уникальный ID
{users.map(user => (
    <UserCard key={user.id} user={user} />
))}

// ⚠️ МОЖНО — индекс (для статических списков)
{items.map((item, index) => (
    <li key={index}>{item}</li>
))}

// ❌ ПЛОХО — без key
{items.map(item => (
    <li>{item}</li>
))}
```

---

### 📌 **В проекте (React версия)**

```jsx
function HistoryList() {
    const [history, setHistory] = useState([]);
    
    return (
        <div className="history-container">
            {history.map((item, index) => (
                <div key={index} className="history-item">
                    <span className="expression">{item.expression}</span>
                    <span className="result">= {item.result}</span>
                </div>
            ))}
        </div>
    );
}
```

---

### 📌 **В проекте (Vanilla JS)**

```javascript
// В нашем проекте (без React)
function renderHistory() {
    historyContainer.innerHTML = history.map((item, index) => `
        <div class="history-item">
            <span class="expression">${item.expression}</span>
            <span class="result">= ${item.result}</span>
        </div>
    `).join('');
}
```

---

## 🎯 Шпаргалка

### Фон

| Свойство | Что делает |
|----------|------------|
| `background-color` | Цвет фона |
| `background-image` | Фоновое изображение |
| `background-size` | Размер фона |
| `background-repeat` | Повторение фона |

### .map() в React

```jsx
{data.map(item => (
    <Component key={item.id} data={item} />
))}
```

### Ключевые моменты .map()

| Что | Зачем |
|-----|-------|
| `.map()` | Преобразует массив |
| `key` | Уникальный идентификатор для React |
| `key={item.id}` | Лучший способ |
| `key={index}` | Только для статических списков |