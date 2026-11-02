const products = [
    { id: 1, name: 'Аккумуляторная дрель-шуруповерт', price: 5490, image: 'https://unsplash.com' },
    { id: 2, name: 'Перфоратор SDS-Plus', price: 8200, image: 'https://unsplash.com' },
    { id: 3, name: 'Угловая шлифмашина (Болгарка)', price: 3990, image: 'https://unsplash.com' },
    { id: 4, name: 'Лазерный уровень 3D', price: 6500, image: 'https://unsplash.com' }
];

let cart = [];

// Отрисовка товаров на странице
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="product-price">${product.price} ₽</div>
            <button class="btn" onclick="addToCart(${product.id})">В корзину</button>
        </div>
    `).join('');
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Удаление товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Обновление интерфейса корзины
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceEl = document.getElementById('total-price');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        totalPriceEl.textContent = '0';
        return;
    }

    let total = 0;
    cartItemsList.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <li class="cart-item">
                <span>${item.name} — ${item.price} ₽</span>
                <button class="btn" style="background:#e74c3c; padding: 5px 10px; font-size:12px;" onclick="removeFromCart(${index})">Удалить</button>
            </li>
        `;
    }).join('');

    totalPriceEl.textContent = total;
}

// ВОТ ОНА — ФУНКЦИЯ ОФОРМЛЕНИЯ ЗАКАЗА И ОПЛАТЫ (ИМИТАЦИЯ API)
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    const total = document.getElementById('total-price').textContent;

    // 1. Создаем модальное окно для ввода карты (имитируем вызов платежного виджета)
    const paymentModal = document.createElement('div');
    paymentModal.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); display: flex; justify-content: center;
        align-items: center; z-index: 10000;
    `;
    paymentModal.id = 'payment-gate';

    paymentModal.innerHTML = `
        <div style="background: #fff; padding: 30px; border-radius: 8px; width: 350px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <h3 style="margin-bottom: 15px; color: #1a252f;">Шлюз оплаты (Тестовый API)</h3>
            <p style="margin-bottom: 20px;">Сумма к оплате: <strong style="color: #27ae60;">${total} ₽</strong></p>
            
            <input type="text" placeholder="Номер карты (16 цифр)" id="card-num" maxlength="16" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" placeholder="ММ/ГГ" id="card-date" maxlength="5" style="width: 50%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                <input type="password" placeholder="CVC" id="card-cvc" maxlength="3" style="width: 50%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <button id="pay-submit-btn" class="btn" style="width: 100%; background: #27ae60;">Оплатить заказ</button>
            <button onclick="document.getElementById('payment-gate').remove()" style="margin-top: 10px; background: none; border: none; color: #888; cursor: pointer;">Отмена</button>
        </div>
    `;

    document.body.appendChild(paymentModal);

    // 2. Обрабатываем клик по кнопке "Оплатить"
    document.getElementById('pay-submit-btn').addEventListener('click', function() {
        const cardNum = document.getElementById('card-num').value;
        
        if (cardNum.length < 16 || isNaN(cardNum)) {
            alert('Ошибка API: Неверный формат карты. Введите 16 цифр.');
            return;
        }

        // Меняем текст кнопки, имитируя ожидание ответа от сервера
        this.textContent = 'Обработка платежа банком...';
        this.disabled = true;

        // Имитируем задержку сети в 2 секунды
        setTimeout(() => {
            document.getElementById('payment-gate').remove();
            
            alert(`🎉 Оплата прошла успешно!\nСписано: ${total} ₽.\nДанные переданы на сборку.`);
            
            // Очищаем корзину после успешной оплаты
            cart = [];
            updateCart();
        }, 2000);
    });
}

// Запуск отрисовки при старте страницы
renderProducts();
