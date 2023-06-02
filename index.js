require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const TelegramApi = require('node-telegram-bot-api');
const Orders = require('./models/order-model');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    getOrders();
  } catch (error) {
    console.log(error);
  }
};

start();

// telegrambot development

const token = process.env.TELEGRAM_BOT_TOKEN;

const telegramBot = new TelegramApi(token, { polling: true });

const getOrders = async () => {
  try {
    const changeStream = await Orders.watch();
    changeStream.on('change', (change) => {
      if (change.operationType === 'insert') {
        const newOrder = change.fullDocument;

        const newOrderInfo = `
❗️ Вы получили новый заказ! ❗️

▫️ Имя клиента: ${newOrder.name}
▫️ Номер телефона клиента: ${newOrder.phone}
▫️ Адрес клиента: ${newOrder.adressOfTheUser}
▫️ Метод оплаты: ${newOrder.methodOfPayment}
▫️ Комментарий: ${newOrder.comment}

▫️ Заказанные блюда: ${newOrder.dishes.map((dish, idx) => {
          return `
 ${idx + 1}.
   - Название: ${dish.title}
   - Цена за единицу: ${dish.price}
   - Количество порций: ${dish.quantity}
______________________________`;
        })}

▫️ Общая сумма заказа: ${newOrder.totalPrice} ₾`;

        telegramBot.sendMessage('619621115', newOrderInfo);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
