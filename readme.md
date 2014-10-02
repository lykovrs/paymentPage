Верстка платежной страницы.

css - файлы стилей страницы
images - изображения требуемые для верстки
js - файлы плагинов

js/paymentPaje.js - файл для инициализации плагинов


Требования к платёжной странице
Страница должна содержать ряд необходимых объектов, а также ряд полей для ввода платёжной информации с определённым
названием.
Название страницы
Название обычной страницы – payment_<ln>.html,
Название страницы для мобильного устройства - mobile_payment_<ln>.html,
где <ln> - двухбуквенное обозначение локали страницы в кодировке ISO 639-1 (например, ru – русский, en - английский).Заголовок страницы
В заголовке страницы должны подключаться следующие скрипты:
Стандартный вариант:
<script type="text/javascript" src="../../js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../../js/jquery.timers-1.2.js"></script>
<script type="text/javascript" src="../../js/jquery.url.js"></script> 
<script type="text/javascript" src="../../js/jquery.payment.js"></script> 
<script> 
$(document).payment({ 
}); 
</script>
Расширенный вариант:
<script type="text/javascript" src="../../js/jquery-1.4.2.min.js"></script> 
<script type="text/javascript" src="../../js/jquery.timers-1.2.js"></script> 
<script type="text/javascript" src="../../js/jquery.url.js"></script> 
<script type="text/javascript" src="../../js/jquery.payment.js"></script> 
<script> 
$(document).payment({ 
language: "ru", 
messageAjaxError: "Сервис временно недоступен. Попробуйте позднее.",
messageTimeRemaining: "До окончания сессии осталось #MIN#:#SEC#",
visualValidationEnabled: true 
}); 
</script>
Поля расширенного вида скрипта должны быть заполнены следующим образом:
language – значение название языка, совпадающее с выбранным для названия страницы
messageAjaxError – сообщение о внутренней ошибки Ajax (возникает например при отсутствии доступа к системе)
messageTimeRemaining – сообщение счётчика сессии. В нём обязательно должны быть указаны ключевые слова «#MIN#» и
«#SEC#», которые в реальном времени будут заменять на минуты и секунды, обозначающие время до окончания сессии.
visualValidationEnabled - индикатор включения/выключения визуального подтверждения итогов валидации. Если true - то поле с
корректно введённым значением окрасится в зеленый цвет, с неправильным значением - в красный. При значении false (или
неуказании данной строчки), визуальная валидация не будет работать - цвет полей меняться не будет.
Тело страницы
Все блоки и элементы, описанные ниже в данном параграфе, обязательно должны быть размещены в теле страницы, если явно не
указано иное. 
<div id="orderNumber"></div>
блок, где содержится уникальный номер заказа 
<div id="amount"></div>
блок, где содержится сумма оплаты заказа 
<div id="description"></div>блок, где содержится описание заказа
Платежная форма
Страница должна содержать платежную форму:
<form name="PaymentForm" action="#" method="post" id="formPayment">
<input type="hidden" id="expiry" > 
<input type="hidden" id="mdOrder" > 
<input type="hidden" id="location" value="/../" > 
<input type="hidden" id="language" value="<ln>" > 
</form>
Все указанные выше hidden-поля обязательны. Значение поля language должно содержать двухбуквенное обозначение локали страницы.
Форма также должна содержать поля для ввода информации для проведения платежа: 
<input name="$PAN" id="iPAN" maxlength="19" type="text" autocomplete="off" />
Поле для ввода номера кредитной карты 
<select name="MM" id="month"> 
 <option value="01" selected> 1 - январь</option>
 <option value="02"> 2 - февраль</option> 
 <option value="03"> 3 - март</option> 
 <option value="04"> 4 - апрель</option> 
 <option value="05"> 5 - май</option> 
 <option value="06"> 6 - июнь</option> 
 <option value="07"> 7 - июль</option> 
 <option value="08"> 8 - август</option> 
 <option value="09"> 9 - сентябрь</option> 
 <option value="10">10 - октябрь</option> 
 <option value="11">11 - ноябрь</option> 
 <option value="12">12 - декабрь</option> 
</select> / 
<select name="YYYY" id="year"> 
 <option value='2012' selected>2012</option> 
 <option value='2013'>2013</option> 
 <option value='2014'>2014</option> 
 <option value='2015'>2015</option> 
 <option value='2016'>2016</option> 
 <option value='2017'>2017</option> 
 <option value='2018'>2018</option> 
 <option value='2019'>2019</option> 
 <option value='2020'>2020</option> 
 <option value='2021'>2021</option> 
 <option value='2022'>2022</option> 
</select>
Селектор месяца и селектор года (заполняется автоматически при загрузке страницы) истечения срока действия кредитной карты 
<input name="TEXT" id="iTEXT" maxlength="90" type="text" autocomplete="off" />
Поле ввода имени владельца карты (Cardholder name) 
<input name="$CVC" id="iCVC" maxlength="3" type="password" autocomplete="off" />
поле ввода cvc/cvv/cid -кода <input value="Оплатить" type="button" id="buttonPayment">
кнопка подтверждения оплаты. 
После формы оплаты, ниже должен быть размещён следующий код:
<form id="acs" method="post" action=""> 
 <input type="hidden" id="MD" name="MD"/> 
 <input type="hidden" id="PaReq" name="PaReq"/> 
 <input type="hidden" id="TermUrl" name="TermUrl"/>
</form>
На странице оплаты должны быть также размещены следующие объекты: 
<div id="errorBlock" style="color:red;"></div>
блок, где отображаются ошибки (например, неверные данные по карте) 
<div id="numberCountdown"></div>
блок, где отображается сообщение о том, сколько ещё времени до конца сессии оплаты. 
<div id="infoBlock"></div>
блок, где отображается информационное сообщение при переходе со страницы оплаты на итоговую страницу. 
<div id="indicator" style="display:none;"><img src="../../img/ajax-loader.gif" height="19" width="220" alt="indicator"></div>
блок, где отображается индикатор прогресса выполнения запроса к серверу (при подтверждении оплаты и последующему обращению к
серверу)
