1. Project Overview

SmartApply — это интерактивная платформа, работающая как персональный AI-консультант по поступлению. В отличие от обычных справочников, SmartApply анализирует профиль абитуриента (GPA, SAT, IELTS) и мгновенно выдает прогноз зачисления и шансов на получение гранта в конкретные вузы Казахстана и мира.

Проект разработан в рамках хакатона Impact Admissions × QApp 2026 для интеграции в экосистему QApp.
2. Problem Statement

Абитуриенты сталкиваются с тремя критическими проблемами:

    Неопределенность и риск: Непонимание реального «веса» своих баллов на фоне конкуренции ведет к потере денег на подачу заявок в «рискованные» вузы.

    Сложность аналитики: Требования вузов меняются ежегодно. Ручной анализ сотен сайтов изнурителен и часто приводит к ошибкам.

    Упущенные возможности: Студенты часто не подают на гранты там, где их шансы были максимальны, просто из-за отсутствия данных.

3. Solution

SmartApply решает эти проблемы через:

    Мгновенное сопоставление: Алгоритм сравнивает профиль студента с актуальными требованиями вузов.

    Снижение стресса: Четкая классификация вузов на категории (Safety/Target/Reach) дает понятную стратегию поступления.

    Score Simulator: Инструмент, позволяющий увидеть, как изменение баллов (например, пересдача SAT) влияет на вероятность получения гранта.

4. Features

    ✅ Smart Fit Score: Визуализация шансов на зачисление и получение гранта в процентах.

    ✅ Interactive Score Simulator: Реальном времени пересчет шансов при изменении GPA/SAT/IELTS.

    ✅ Admission Roadmap: Пошаговая визуальная шкала процесса поступления.

    ✅ AI Advisor Chat: Чат-бот, отвечающий на вопросы о документах и стипендиях на основе данных вуза.

    ✅ Multilingual Support: Полная локализация интерфейса на Казахский (KK), Русский (RU) и Английский (EN) языки.

    ✅ Tiered Pricing Model: Реализованная структура тарифных планов (Basic, Pro, Elite).

    ✅ Mobile Optimized: Полностью адаптивный дизайн (Mobile-first).

5. Tech Stack

    Frontend: React 18, Vite (fast build tool), Tailwind CSS (styling).

    Animations: Framer Motion (smooth transitions & interactions).

    Icons: Lucide React.

    Backend: Node.js, Express.js.

    Communication: REST API, CORS.

6. How to Run
Prerequisites

    Node.js (v18 or higher)

    npm or yarn

Steps

    Clone the repository:
    code Bash

    git clone https://github.com/justsummon/smartapply.git
    cd smartapply

    Run Backend Server:
    code Bash

    cd server
    npm install
    node index.js

    Run Frontend Client:
    Open a new terminal window
    code Bash

    cd client
    npm install
    npm run dev

    Access the app: Open http://localhost:5173 in your browser.

7. Data Explanation

Для данного MVP используется High-Fidelity Mock Data, транслируемая через Node.js сервер.

    Университеты: Данные по Astana IT University, Nazarbayev University и KIMEP (проходные баллы, дедлайны, стоимость).

    ML Simulation: Алгоритм расчета шансов имитирует работу нейронной сети, используя весовые коэффициенты для академических показателей.

8. Screenshots
   web application/stitch/projects/12613284229852485704/screens/a304c2ebc51a4442a5023a19a3610a20<img width="655" height="1600" alt="изображение" src="https://github.com/user-attachments/assets/138491ad-48a4-4368-85e3-29e7dc18cf7d" />
   web application/stitch/projects/12613284229852485704/screens/9ea87b955ea3496a8e589aab3c02fdf1<img width="892" height="1600" alt="изображение" src="https://github.com/user-attachments/assets/2addfd4e-98df-4e77-b2c5-56f7f48688ed" />

9. Limitations

    Алгоритм ML: На текущем этапе используется упрощенная математическая модель вместо полноценно обученной нейросети.

    База данных: В MVP включены только топовые вузы Казахстана.

    Интеграция: Прямая загрузка документов на сервер реализована как UI-прототип без сохранения в облачное хранилище.

10. Future Improvements

    Real ML Training: Обучение модели на реальных данных о зачислениях 50,000+ студентов за прошлые годы.

    AI Essay Reviewer: Полноценный NLP-модуль для анализа и корректировки мотивационных писем.

    WhatsApp/Telegram Bot: Автоматические уведомления о дедлайнах выбранных программ.

    B2B Dashboard: Личный кабинет для университетов-партнеров для поиска целевых абитуриентов.
